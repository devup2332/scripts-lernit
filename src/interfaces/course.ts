export interface ICourse {
  name: string;
  id: string;
  topicId: string;
  clientId: string;
  stage: number;
  type: string;
  isDeleted: boolean;
  origin: string
  deletedAt: string;
}

export interface ICourseMarketplaceDataTP {
  course: ICourse;
}
