import { mongoose } from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    image: {
      type: String,
      required: true, // Ensure user images are required
    },
    mail: {
      type: String,
      required: true, // Ensure user emails are required
      unique: true // Ensure user emails are unique
    },
    firstname: {
      type: String,
      required: true, // Ensure user first names are required
    },
    lastname: {
      type: String,
      required: true, // Ensure user last names are required
    
    },
    age: {
      type: Number,
      required: true, // Ensure user ages are required
    
    },
    gender: String,
    password: {
      type: String,
      required: true, // Ensure user passwords are required
      select: false // Automatically exclude from query results
    },
    languages: [String],
    address: String,   
  },
  { timestamps: true }  // Automatically include createdAt and updatedAt fields
);

const eventSchema = new Schema(
  {
    image: String,
    title: {
      type: String,
      required: true, // Ensure event titles are required
      unique: true // Ensure event titles are unique
    },
    description: String,
    date: Date,
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }], 
    maxParticipants: Number,
    address: String,
    organizer: String,   
  },
  { timestamps: true }  // Automatically include createdAt and updatedAt fields
 );




export const models = [
  {
    name: "User",
    schema: userSchema,
    collection: "users",
  },
  {
    name: "Event",
    schema: eventSchema,
    collection: "events",
  },
];