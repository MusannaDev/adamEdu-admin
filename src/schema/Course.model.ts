import mongoose, {Schema} from "mongoose";
import { CourseCollection, CourseType, CourseVolume } from "../libs/enum/course.enum";
import { CourseStatus } from "../libs/enum/course.enum";


const courseSchema = new Schema(
  {
  courseStatus: {
    type: String,
    enum: CourseStatus.PAUSE,
  },

  CourseCollection: {
    type: String,
    enum: CourseCollection,
    required: true,
  },

  courseName: {
    type: String,
    required: true,
  },

  coursePrice: {
    type: Number,
    required: true,
  },

  courseLeftCount: {
    type: Number,
    required: true,
  },

  courseType: {
    type: String,
    enum: CourseType,
    default: CourseType.STANDARD,
  },

  courseVolume: {
    type: Number,
    enum: CourseVolume,
    default: CourseVolume.NINETY_MINUTES,
  },

  courseDesc: {
    type: String,
  },

  courseImages: {
    type: [String],
    default: [],
  },
  courseViews: {
    type: Number,
    default: 0,
  },

  },
  { timestamps: true} // updatedAt createdAt
);

courseSchema.index({ courseName: 1, courseType: 1, courseVolume: 1 }, { unique: true }
);  

export default mongoose.model('Course', courseSchema);