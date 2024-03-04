import { mongoose } from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    image: String,
    mail: {
      type: String,
      required: true, // Ensure user emails are required
      unique: true // Ensure user emails are unique
    },
    firstname: String,
    lastname: String,
    age: Number,
    gender: String,
    password: {
      type: String,
      required: true, // Ensure user passwords are required
      select: false // Automatically exclude from query results
    },
    registered_events: [String], 
    languages: [String],
    address: String,   
  },
  { timestamps: true }  // Automatically include createdAt and updatedAt fields
);


export const models = [
  {
    name: "User",
    schema: userSchema,
    collection: "users",
  },
];