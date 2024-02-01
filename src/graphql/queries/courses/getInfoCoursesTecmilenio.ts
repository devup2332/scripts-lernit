import { gql } from "graphql-request";
import { COURSE_INFO_FRAGMENT } from "../../fragments/course";

export const GET_INFO_COURSES_TECMILENIO = gql`
  query GET_INFO_COURSES_TECMILENIO {
    courses: courses_cl(
      where: {
        client_id: { _eq: "content" }
        origin: { _eq: "tecmilenio" }
        stage: { _gte: 7 }
        is_deleted: { _eq: false }
      }
    ) {
      ...courseInfo
    }
  }
  ${COURSE_INFO_FRAGMENT}
`;
