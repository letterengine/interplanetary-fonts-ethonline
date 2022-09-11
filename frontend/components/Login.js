import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { XCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const WorldIDWidget = dynamic(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);

import SwitchNetwork from './SwitchNetworks';
import useIsMounted from './utils/useIsMounted';
import { USER_PROFILES_QUERY } from '../graphql'
import { CHAIN_ID, ERROR_MESSAGE } from '../utils/constants';
import onError from '../utils/onError';

const CHALLENGE_QUERY = gql`
  query Challenge($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
    }
  }
`;

export const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

const signupActionId = process.env.NEXT_PUBLIC_SIGNUP_WORLD_ID_ACTION_ID;


export default function Login() {
  const [hasConnected, setHasConnected] = useState(false);
  const [profileId, setProfileId] = useState();


  const { mounted } = useIsMounted();
  const { chain } = useNetwork();
  const { connectors, error, connectAsync } = useConnect();
  const { address, connector: activeConnector } = useAccount();
  const { signMessageAsync, isLoading: signLoading } = useSignMessage({ onError });
  const [loadChallenge, { error: errorChallenge, loading: challengeLoading }] = useLazyQuery(
    CHALLENGE_QUERY,
    {
      fetchPolicy: 'no-cache'
    }
  );
  const [authenticate, { error: errorAuthenticate, loading: authLoading }] =
    useMutation(AUTHENTICATE_MUTATION);
  const [getProfiles, { error: errorProfiles, loading: profilesLoading }] = useLazyQuery(USER_PROFILES_QUERY);

  const onConnect = async (connector) => {
    try {
      const account = await connectAsync({ connector });
      if (account) {
        setHasConnected(true);
      }
    } catch { }
  };

  const handleSign = async () => {
    try {
      // Get challenge
      const challenge = await loadChallenge({
        variables: { request: { address } }
      });

      if (!challenge?.data?.challenge?.text) {
        return toast.error(ERROR_MESSAGE);
      }

      // Get signature
      const signature = await signMessageAsync({
        message: challenge?.data?.challenge?.text
      });

      // Auth user and set cookies
      const auth = await authenticate({
        variables: { request: { address, signature } }
      });
      localStorage.setItem('accessToken', auth.data.authenticate.accessToken);
      localStorage.setItem('refreshToken', auth.data.authenticate.refreshToken);

      // Get authed profiles
      const { data: profilesData } = await getProfiles({
        variables: { ownedBy: address }
      });

      if (profilesData?.profiles?.items?.length === 0) {
        setProfileId(null);
      } else {
        const profiles = profilesData?.profiles?.items
          ?.slice()
          ?.sort((a, b) => Number(a.id) - Number(b.id))
          ?.sort((a, b) => (!(a.isDefault !== b.isDefault) ? 0 : a.isDefault ? -1 : 1));
        const currentProfile = profiles[0];
        // setProfiles(profiles);
        // setCurrentProfile(currentProfile);
        setProfileId(currentProfile.id);

        console.log(profiles);
        console.log(currentProfile);
        console.log(currentProfile.id);
      }
    } catch { }
  };

  const isLoading = signLoading || challengeLoading || authLoading || profilesLoading;

  // User has attempted to sign in and get lens profile
  if (profileId !== undefined) {
    return (
      <WorldIDWidget
        actionId={signupActionId}
        signal={profileId || address}
        enableTelemetry
        onSuccess={(verificationResponse) => {
          toast.success("You verified your humanity!!");
          console.log(verificationResponse);
        }}
        onError={(error) => {
          toast.error("There was an error verifying your humanity.");
          console.error(error);
        }}
      />
    );
  }

  return activeConnector?.id ? (
    <div className="space-y-3">
      {chain?.id === CHAIN_ID ? (
        <button
          className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900"
          disabled={isLoading}
          onClick={handleSign}
        >
          { isLoading ? 'Loading...' : 'Sign-In with Lens' }
        </button>
      ) : (
        <SwitchNetwork />
      )}
      {(errorChallenge || errorAuthenticate || errorProfiles) && (
        <div className="flex items-center space-x-1 font-bold text-red-500">
          <XCircleIcon className="w-5 h-5" />
          <div>{ERROR_MESSAGE}</div>
        </div>
      )}
    </div>
  ) : (
    <div className="inline-block overflow-hidden space-y-3 w-full text-left align-middle transition-all transform">
      {connectors.map((connector) => {
        return (
          <button
            type="button"
            key={connector.id}
            className={clsx(
              {
                'hover:bg-gray-100 dark:hover:bg-gray-700': connector.id !== activeConnector?.id
              },
              'w-full flex items-center space-x-2.5 justify-center px-4 py-3 overflow-hidden focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900'
            )}
            onClick={() => onConnect(connector)}
            disabled={mounted ? !connector.ready || connector.id === activeConnector?.id : false}
          >
            <span className="flex justify-between items-center w-full">
              {mounted ? (connector.id === 'injected' ? 'Browser Wallet' : connector.name) : connector.name}
              {mounted ? !connector.ready && ' (unsupported)' : ''}
            </span>
          </button>
        );
      })}
      {error?.message ? (
        <div className="flex items-center space-x-1 text-red-500">
          <XCircleIcon className="w-5 h-5" />
          <div>{error?.message ?? 'Failed to connect'}</div>
        </div>
      ) : null}
    </div>
  );
}