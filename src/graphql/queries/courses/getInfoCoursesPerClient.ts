import { gql } from "graphql-request";
import {
  COURSE_INFO_FRAGMENT,
  USERS_COURSE_INFO_FRAGMENT,
} from "../../fragments/course";

export const GET_INFO_COURSES_PER_CLIENT = gql`
  query GET_INFO_COURSES_PER_CLIENT($clientId: String) {
    courses: courses_cl(
      where: {
        client_id: { _eq: $clientId }
        deleted_at: { _is_null: true }
        stage: { _gte: 7 }
      }
    ) {
      ...courseInfo
      usersCourse: users_course(
        where: { user: { client_id: { _eq: $clientId } } }
      ) {
        ...usersCourseInfo
      }
    }
  }
  ${COURSE_INFO_FRAGMENT}
  ${USERS_COURSE_INFO_FRAGMENT}
`;
