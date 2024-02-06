import { gql } from "graphql-request";

export const COURSE_INFO_FRAGMENT = gql`
  fragment courseInfo on courses_cl {
    name
    id: course_fb
    topicId: topic_id
    clientId: client_id
    stage
    type
    isDeleted: is_deleted
    deletedAt: deleted_at
    origin
    topic {
      topicId: topic_fb
      name
    }
  }
`;

export const USERS_COURSE_INFO_FRAGMENT = gql`
  fragment usersCourseInfo on user_course_cl {
    score
    progress
  }
`;
