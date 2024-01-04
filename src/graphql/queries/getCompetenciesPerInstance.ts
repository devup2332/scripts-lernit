import { gql } from "graphql-request";

export const GET_COMPENTENCIES_PER_INSTANCE = gql`
  query GET_COMPENTENCIES_PER_INSTANCE($clientId: String) {
    competenciesLXP: competencies_cl(where: { client_id: { _eq: $clientId } }) {
      name
      competencieId: competencies_fb
    }
  }
`;
