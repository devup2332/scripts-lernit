import { gql } from "graphql-request";

export const GET_INFO_COURSES_MP_PER_CLIENT = gql`
  query GET_INFO_COURSES_MP_PER_CLIENT($clientId: String) {
    coursesMP: marketplace_data_tb(
      where: {
        client_fb: { _eq: $clientId }
        available_in_client: { _eq: true }
      }
    ) {
      course: courses_cl {
        name
        deletedAt: deleted_at
        id: course_fb
        stage
        type
        isDeleted: is_deleted
      }
    }
  }
`;
