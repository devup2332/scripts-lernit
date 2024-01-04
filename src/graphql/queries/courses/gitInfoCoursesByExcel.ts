import { gql } from "graphql-request";

export const GET_INFO_COURSES_BY_IDS = gql`
  query GET_INFO_COURSES_BY_IDS($coursesIds: [String]) {
    coursesLXP: courses_cl(where: { course_fb: { _in: $coursesIds } }) {
      name
      id: course_fb
      topicId: topic_id
      clientId: client_id
    }
  }
`;
