export interface ICourse {
  name: string;
  id: string;
  topicId: string;
  clientId: string;
  stage: number;
  type: string;
  isDeleted: boolean;
  origin: string;
  deletedAt: string;
  topic: {
    name: string;
    topicId: string;
  };
  usersCourse: UserCourse[];
}

export interface UserCourse {
  score: number;
  progress: number;
}

export interface ICourseMarketplaceDataTP {
  course: ICourse;
  topicId: string;
}
