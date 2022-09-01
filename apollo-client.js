//import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/naumanmehdi/web3rsvp-wbw3",
  cache: new InMemoryCache(),
});

export default client;