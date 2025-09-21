import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type: String,
      default: "user",
    },
    profilePic: {
      type: String,
      default: "",
    },
    work:{
      type: String,
    },
    country:{
      type:String,
    },
    city:{
      type: String,
    },
    street: {
      type: String,
    },
    about:{
      type: String,
    },
    skills:{
      type: [String]
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
