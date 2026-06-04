import { Course, CourseInput, CourseInquiry, CourseUpdateInput } from "../libs/types/course";
import CourseModel from "../schema/Course.model";
import Errors from "../libs/Errors";
import { HttpCode, Message} from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { CourseStatus } from "../libs/enum/course.enum";
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enum/view.enum";
import ViewService from "./View.service";

class CourseService {
  private readonly courseModel;
  public viewService;

  constructor() {
    this.courseModel = CourseModel;
    this.viewService = new ViewService();
  }

  /* SPA */

  public async getCourses(inquiry: CourseInquiry): Promise<Course[]> {
    const match: T = { courseStatus: CourseStatus.PROCESS};

    if (inquiry.CourseCollection)
      match.CourseCollection = inquiry.CourseCollection;
    
    if (inquiry.search) {
      match.courseName = { $regex: new RegExp(inquiry.search, "i")};
    }

    const sort: T = 
      inquiry.order === "coursePrice"
        ? { [inquiry.order]: 1 }
        : { [inquiry.order]: -1 };

    const result = await this.courseModel
    .aggregate([
      { $match: match },
      { $sort: sort },
      { $skip: (inquiry.page* 1 - 1) * inquiry.limit },
      { $limit: inquiry.limit * 1 },
    ])
    .exec();
    if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    
    return result;
  }

  public async getCourse(memberId: ObjectId | null, id: string ): Promise<Course> {
    const courseId = shapeIntoMongooseObjectId(id);

    let result = this.courseModel
      .findOne({_id: courseId, courseStatus: CourseStatus.PROCESS})
      .exec()
    if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    if (memberId) {
      // Check Existance
      const input: ViewInput = {
        memberId: memberId,
        viewRefId: courseId,
        viewGroup: ViewGroup.COURSE,
      }
      const existView = await this.viewService.checkViewExistance(input);

      console.log("exist:", !!existView);
      if (!existView) {
        // Insert View 
        await this.viewService.insertMemberView(input);

        // Increase counts
        result = await this.courseModel
          .findByIdAndUpdate(
            courseId,
            { $inc: { courseViews: +1 } },
            { new: true }
          )
          .exec();

      }
    }
   
    return result;
  }

  /* SSR */

  public async getAllCourses(): Promise<Course[]> {
    const result = await this.courseModel.find().exec();
    if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    console.log("result:", result);
    return result;
  }

  public async createNewCourse(input: CourseInput): Promise<Course> {
    try{
      return await this.courseModel.create(input);
    } catch(err) {
      console.error("Error, model:createNewCourse:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenCourse(
    id: string, 
    input: CourseUpdateInput
    ):Promise<Course> {
    id = shapeIntoMongooseObjectId(id);
    // string => ObjectID
    
    const result = await this.courseModel.findByIdAndUpdate({ _id: id }, input, { new: true }).exec();
    
    if(!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    return result;
  }
  
}

export default CourseService;