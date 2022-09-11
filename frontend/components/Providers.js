import { ApolloProvider } from '@apollo/client';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { CHAIN_ID } from '../utils/constants';

import client from '../apollo-client';

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
const infuraRpc = process.env.NEXT_PUBLIC_INFURA_RPC;

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [infuraProvider({ infuraId }), publicProvider()]
);

const connectors = () => {
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true }
    }),
    new WalletConnectConnector({
      chains,
      options: { 
        rpc: { 
          [CHAIN_ID]: infuraRpc
        }
      }
    })
  ];
};

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

const Providers = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </WagmiConfig>
  );
};

export default Providers;