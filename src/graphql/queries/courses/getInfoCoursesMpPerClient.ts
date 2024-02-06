import { gql } from "graphql-request";
import {
  COURSE_INFO_FRAGMENT,
  USERS_COURSE_INFO_FRAGMENT,
} from "../../fragments/course";

export const GET_INFO_COURSES_MP_PER_CLIENT = gql`
  query GET_INFO_COURSES_MP_PER_CLIENT($clientId: String) {
    coursesMP: marketplace_data_tb(
      where: {
        client_fb: { _eq: $clientId }
        available_in_client: { _eq: true }
      }
    ) {
      topicId: topic_id
      course: courses_cl {
        ...courseInfo
        usersCourse: users_course(
          where: { user: { client_id: { _eq: $clientId } } }
        ) {
          ...usersCourseInfo
        }
      }
    }
  }
  ${COURSE_INFO_FRAGMENT}
  ${USERS_COURSE_INFO_FRAGMENT}
`;
