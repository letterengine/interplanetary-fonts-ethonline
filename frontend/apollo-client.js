import {
  ApolloClient,
  ApolloLink,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
  toPromise
} from '@apollo/client';
import getJwtExpiration from './utils/getJwtExpiration'

import { RetryLink } from '@apollo/client/link/retry';
import { ERROR_MESSAGE } from './utils/constants';

const API_URL = process.env.NEXT_PUBLIC_LENS_API_URL;
console.log(API_URL)

const REFRESH_AUTHENTICATION_MUTATION = `
  mutation Refresh($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

const httpLink = new HttpLink({
  uri: API_URL,
  fetchOptions: 'no-cors',
  fetch
});

// RetryLink is a link that retries requests based on the status code returned.
const retryLink = new RetryLink({
  delay: {
    initial: 100
  },
  attempts: {
    max: 2,
    retryIf: (error) => !!error
  }
});

const clearStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken || accessToken === 'undefined') {
    clearStorage();
    return forward(operation);
  }

  const expiringSoon = Date.now() >= getJwtExpiration(accessToken)?.exp * 1000;

  if (!expiringSoon) {
    operation.setContext({
      headers: {
        'x-access-token': accessToken ? `Bearer ${accessToken}` : ''
      }
    });

    return forward(operation);
  }

  return fromPromise(
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        operationName: 'Refresh',
        query: REFRESH_AUTHENTICATION_MUTATION,
        variables: {
          request: { refreshToken: localStorage.getItem('refreshToken') }
        }
      })
    })
      .then(({ data }) => {
        const accessToken = data?.data?.refresh?.accessToken;
        const refreshToken = data?.data?.refresh?.refreshToken;
        operation.setContext({
          headers: {
            'x-access-token': `Bearer ${accessToken}`
          }
        });

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return toPromise(forward(operation));
      })
      .catch(() => {
        console.log(ERROR_MESSAGE);

        return toPromise(forward(operation));
      })
  );
})


// TODO - Using just lens graphql endpoint here to read and write to lens smart contract
// but we need to read from the interplanetary font smart contract using thegraph as well
// might be able to do something like...
// https://stackoverflow.com/questions/69629051/using-multiple-endpoints-in-apollo-client
// or maybe we can use the graphql client that the graph provides...
// https://thegraph.com/docs/en/querying/querying-from-an-application/
const client = new ApolloClient({
  link: from([retryLink, authLink, httpLink]),
  cache: new InMemoryCache()
});

export default client;