import { gql } from "graphql-request";

export const GET_THEMES_PER_INSTANCE = gql`
  query GET_THEMES_PER_INSTANCE($clientId: String) {
    themesInstance: topic_cl(where: { client_id: { _eq: $clientId } }) {
      name
      id: topic_fb
    }
  }
`;
