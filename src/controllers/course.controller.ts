import { Request, Response} from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { CourseInput, CourseInquiry } from "../libs/types/course";
import { AdminRequest, ExtentedRequest } from "../libs/types/member";
import { CourseCollection } from "../libs/enum/course.enum";
import CourseService from "../models/Course.service";


const courseService = new CourseService();

const courseController: T = {};

/* SPA */

courseController.getCourses = async (req: Request, res: Response) => {
  try {
    console.log("getCourses");

    const { page, limit, order, CourseCollection, search } = req.query;
    
    const inquiry: CourseInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };
    
    if (CourseCollection) {
      inquiry.CourseCollection = CourseCollection as CourseCollection;
    }
    if (search) {inquiry.search = String(search)};

    const result = await courseService.getCourses(inquiry); 
 
    res.status(HttpCode.OK).json(result);
  } catch(err) {
    console.log("Error, getCourses:", err); 
    if (err instanceof Errors) (res.status(err.code).json(err));
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}

courseController.getCourse = async (req: ExtentedRequest, res: Response) => {
  try {
    console.log("getCourse");

    const { id } = req.params;
    const memberId = req.member?._id ??  null;

    const result = await courseService.getCourse(memberId, id); 
 
    res.status(HttpCode.OK).json(result);
  } catch(err) {
    console.log("Error, getCourse:", err); 
    if (err instanceof Errors) (res.status(err.code).json(err));
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}

/* SSR */

courseController.getAllCourses = async (req: Request, res: Response) => {
  try {
    console.log("getAllCourses");
    const data = await courseService.getAllCourses();

    res.render("courses", { products: data});
    //res.send("hello world")
  } catch(err) {
    console.log("Error, signup:", err); 
    if (err instanceof Errors) (res.status(err.code).json(err));
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}

courseController.createNewCourse = async (req: AdminRequest, res: Response) => {
  try {
    console.log("createNewCourse");
    console.log("req.body:", req.body);

    if(!req.files?.length) 
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: CourseInput = req.body;
    data.courseImages = req.files?.map((ele) => {
      //return ele.path;
      return ele.path.replace(/\\/g, "/");
    });

    await courseService.createNewCourse(data);
    res.send(
      `<script> alert("Successful creation!"); window.location.replace('/admin/course/all')</script>`
    ); 
  } catch(err) {
    console.log("Error, createNewCourse:", err); 
    const message = 
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(`<script> alert("${message}"); window.location.replace('/admin/course/all')</script>`);
  }
}

courseController.updateChosenCourse = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenCourse");
    const id = req.params.id;
    
    const result = await courseService.updateChosenCourse(id, req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch(err) {
    console.log("Error, updateChosenCourse:", err); 
    if (err instanceof Errors) (res.status(err.code).json(err));
    else res.status(Errors.standard.code).json(Errors.standard);
     
  }
}

export default courseController;