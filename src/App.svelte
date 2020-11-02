<script>
  import { Router } from "@sveltech/routify";
  import { routes } from "../.routify/routes";
  import { writable } from "svelte/store";
  import { ApolloClient } from "@apollo/client";
  import { setClient } from "svelte-apollo";
  import { InMemoryCache } from "apollo-cache-inmemory";
  import { WebSocketLink } from "apollo-link-ws";
  import { split } from "apollo-link";
  import { HttpLink } from "apollo-link-http";
  import { getMainDefinition } from "apollo-utilities";
  import WebSocket from 'isomorphic-ws';

  const wsLink = new WebSocketLink({
      uri: "ws://https://gov-listing.us-west-2.aws.cloud.dgraph.io/graphql",
      options: {
        reconnect: true,
        lazy: true
      },
      webSocketImpl: WebSocket,
    });

    const httpLink = new HttpLink({
      uri: "https://gov-listing.us-west-2.aws.cloud.dgraph.io/graphql",
      fetch: window.fetch
    });

    const link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httpLink
    );
    const cache = new InMemoryCache();

  const client = new ApolloClient({
    link,
      cache
  });
  setClient(client);
</script>

<Router {routes} />
