import { GraphQLClient } from "graphql-request";
import { environments } from "../config/enviroments";

const graphqlClientLernit = new GraphQLClient(
  environments.GRAPHQL_BACKEND_URI,
  {
    headers: {
      "x-hasura-admin-secret": environments.GRAPHQL_BACKEND_SECRET,
      "Access-Control-Allow-Origin": "*",
    },
  }
);

export default graphqlClientLernit;
