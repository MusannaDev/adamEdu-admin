import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import orderController from "./controllers/order.controller";
import courseController from "./controllers/course.controller";

router.post("/member/signup", memberController.signup);
router.post("/member/login", memberController.login); 
router.post("/member/logout", 
  memberController.verifyAuth,
  memberController.logout
);
router.get("/member/detail", 
  memberController.verifyAuth,
  memberController.getMemberDetail
);

router.post("/member/update",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  memberController.updateMember
);

router.get("/member/top-users", memberController.getTopUsers);

router.get("/member/restaurant", memberController.getAdmin);

/* Product */
router.get("/course/all/", courseController.getCourses);
router.get("/course/:id",
  memberController.retrieveAuth,
  courseController.getCourse
);

/* Order */

router.post("/order/create",
  memberController.verifyAuth,
  orderController.createOrder
);

router.get("/order/all",
  memberController.verifyAuth,
  orderController.getMyOrders
);

router.post("/order/update",
  memberController.verifyAuth,
  orderController.updateOrder
);

export default router;