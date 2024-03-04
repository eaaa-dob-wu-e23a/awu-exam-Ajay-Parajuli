import { mongoose } from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Regular expression to validate URL format
          const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
          return urlRegex.test(value);
        },
        message: "Invalid image URL"
      }
    }, // Close the 'image' property

    mail: {
      type: String,
      required: true, // Ensure user emails are required
      unique: true, // Ensure user emails are unique
      validate: {
        validator: function (value) {
          // Regular expression to validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Invalid email address"
      }
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
      select: false, // Automatically exclude from query results
      validate: {
        validator: function (value) {
          // Regular expression to validate password format
          const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{7,}$/;
          return passwordRegex.test(value);
        },
        message: "Password must contain at least 7 letters and one uppercase letter"
      }
    },

    languages: [String],

    address: String,
  },
  { timestamps: true } // Automatically include createdAt and updatedAt fields
);



const eventSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Regular expression to validate URL format
          const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
          return urlRegex.test(value);
        },
        message: "Invalid image URL"
      }
    }, 
    description: String,
    date: {
      type: Date,
      required: true, // Ensure event dates are required
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }], 
    maxParticipants: {
      type: Number,
      required: true, // Ensure event maxParticipants are required
    },
    address: {
      type: String,
      required: true, // Ensure event addresses are required
    },
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