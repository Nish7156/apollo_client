import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:1337/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = '521a2c936d18a69ccddf8181f391ae0ff9a7925b1d96501646b7c8daf2c0f791cc2d311270e7459f886c64edeb6441a2a7f37b11457053551313a2e4925598307d679048d851dd67f4af40af55b2724193940090d890e42c147cd69b194ec4a9a177772092b24c5309bf5b76e0b24a2c56a08de77f9ed4efa204ecf7dfb53319'
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  export default client 