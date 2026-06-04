import mongoose, {Schema} from "mongoose";

const orderItemSchema = new Schema(
  {
    itemQuantity: {
      type: Number,
      required: true,
    },
    itemPrice: {
      type: String,
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    }
  }, 
    { timestamps: true, collection: "orderItems" }
);

export default mongoose.model('OrderItem', orderItemSchema);