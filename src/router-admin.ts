import express from "express";
const routerAdmin = express.Router();
import adminController from "./controllers/admin.controller";
import productController from "./controllers/course.controller";
import makeUploader  from "./libs/utils/uploader";
import courseController from "./controllers/course.controller";

routerAdmin.get("/", adminController.goHome);

routerAdmin
  .get("/signup", adminController.getSignup)
  .post("/signup", 
    makeUploader("members").single("memberImage"),
    adminController.processSignup);

routerAdmin
  .get("/login", adminController.getLogin) 
  .post("/login", adminController.processLogin); 

routerAdmin.get("/logout", adminController.logout);

routerAdmin.get("/check-me", adminController.checkAuthSession) ;

/* Product */

routerAdmin.get("/course/all", 
  adminController.verifyRestaurant, 
  courseController.getAllCourses
);

routerAdmin.post("/course/create",
  adminController.verifyRestaurant,
  makeUploader("products").array("courseImages", 5),
  courseController.createNewCourse
);

routerAdmin.post("/course/:id", 
  adminController.verifyRestaurant,
  courseController.updateChosenCourse
);

/* User */

routerAdmin.get("/user/all", 
  adminController.verifyRestaurant, 
  adminController.getUsers
);

routerAdmin.post("/user/edit", 
  adminController.verifyRestaurant, 
  adminController.updateChosenUser
);

export default routerAdmin;
