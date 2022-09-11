import { gql } from '@apollo/client';
import { ProfileFields } from './PostFields';

export const USER_PROFILES_QUERY = gql`
  query UserProfiles($ownedBy: [EthereumAddress!]) {
    profiles(request: { ownedBy: $ownedBy }) {
      items {
        ...ProfileFields
        isDefault
        dispatcher {
          canUseRelay
        }
      }
    }
    userSigNonces {
      lensHubOnChainSigNonce
    }
  }
  ${ProfileFields}
`;
