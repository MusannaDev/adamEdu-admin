import { ObjectId } from "mongoose"
import { OrderStatus } from "../enum/order.enum";
import { Course } from "./course";

export interface OrderItem {
  itemQuantity: number;
  itemPrice: number;
  orderId: ObjectId;
  courseId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: ObjectId;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: ObjectId;
  memberId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  /* From Aggregation */
  orderItems: OrderItem[];
  courseData: Course[];
}

export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  courseId: ObjectId;
  orderId?: ObjectId;
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus;
}