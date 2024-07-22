import { Schema, model } from "mongoose";

const FeedbackSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = model("Feedback", FeedbackSchema);

export default Feedback;
