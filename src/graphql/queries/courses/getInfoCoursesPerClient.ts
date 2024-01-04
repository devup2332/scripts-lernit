import { gql } from "graphql-request";

export const GET_INFO_COURSES_PER_CLIENT = gql`
  query GET_INFO_COURSES_PER_CLIENT($clientId: String) {
    courses: courses_cl(
      where: {
        client_id: { _eq: $clientId }
        deleted_at: { _is_null: true }
        stage: { _gte: 7 }
      }
    ) {
      name
      deletedAt: deleted_at
      id: course_fb
      stage
      type
      isDeleted: is_deleted
    }
  }
`;
