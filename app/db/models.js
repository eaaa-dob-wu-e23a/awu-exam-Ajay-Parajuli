import { mongoose } from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    image: {
      type: String,
      validate: {
        validator: function (value) {
          // Regular expression to validate URL format
          return /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(value);
        },
        message: "Invalid image URL"
      }
    }, 

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
      required: true,
      validate: {
        validator: function (value) {
          // Add your validation logic for firstname here
          return value.length > 0; // For example, ensuring it's not empty
        },
        message: "First name is required"
      }
    },

    lastname: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Add your validation logic for lastname here
          return value.length > 0; // For example, ensuring it's not empty
        },
        message: "Last name is required"
      }
    },

    age: {
      type: Number,// Ensure user ages are required
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

    languages: {
      type: [String],
      validate: {
        validator: function(languages) {
          // Validate each language in the array
          for (let language of languages) {
            // Check if the language string contains a space
            if (language.includes(' ')) {
              return false;
            }
    
            // Split the language string by comma
            const splitLanguages = language.split(',');
    
            for (const splitLanguage of splitLanguages) {
              // Trim the split language and check if it's empty
              if (!splitLanguage || splitLanguage.trim() === '') {
                return false;
              }
            }
          }
          return true;
        },
        message: 'Languages must be comma separated list - Fx "english, spanish, french"'
      }
    },


    address: String,
  },
  { timestamps: true } // Automatically include createdAt and updatedAt fields
);

userSchema.pre("save", async function (next) {
  const user = this; // this refers to the user document

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next(); // continue
  }

  const salt = await bcrypt.genSalt(10); // generate a salt
  user.password = await bcrypt.hash(user.password, salt); // hash the password
  next(); // continue
});

const eventSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Regular expression to validate URL format
          return /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(value);
        },
        message: "Invalid image URL"
      }
    }, 
    description: String,
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          // Check if the provided date is greater than the current date
          return value > new Date();
        },
        message: "Event date must be in the future"
      }
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