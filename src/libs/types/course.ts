import { ObjectId }from "mongoose";
import { CourseCollection, CourseType, CourseStatus } from "../enum/course.enum";

export interface Course {
  _id: ObjectId;
  courseStatus: CourseStatus;
  CourseCollection: CourseCollection;
  courseName: string;
  coursePrice: number;
  courseLeftCount: number;
  courseType: CourseType;
  courseVolume: number;
  courseDesc?: string;
  courseImages: string[];
  courseViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseInquiry {
  order: string;
  page: number;
  limit: number;
  CourseCollection?: CourseCollection;
  search?: string;
}


export interface CourseInput {
  courseStatus?: CourseStatus;
  CourseCollection: CourseCollection;
  courseName: string;
  coursePrice: number;
  courseLeftCount: number;
  courseType?: CourseType;
  courseVolume?: number;
  courseDesc?: string;
  courseImages?: string[];
  courseViews?: number;
}

export interface CourseUpdateInput {
  _id: ObjectId;
  courseStatus?: CourseStatus;
  CourseCollection?: CourseCollection;
  courseName?: string;
  coursePrice?: number;
  courseLeftCount?: number;
  courseType?: CourseType;
  courseVolume?: number;
  courseDesc?: string;
  courseImages?: string[];
  courseViews?: number;
}

