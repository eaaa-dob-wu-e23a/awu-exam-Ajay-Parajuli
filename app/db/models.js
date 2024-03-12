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
        message: "Invalid image URL",
      },
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
        message: "Invalid email address",
      },
    },
    firstname: {
      type: String,
      validate: {
        validator: function (value) {
          // Add your validation logic for firstname here
          return value.length > 0; // For example, ensuring it's not empty
        },
        message: "First name is required",
      },
    },

    lastname: {
      type: String,
      validate: {
        validator: function (value) {
          // Add your validation logic for lastname here
          return value.length > 0; // For example, ensuring it's not empty
        },
        message: "Last name is required",
      },
    },

    age: {
      type: Number,
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
        message:
          "Password must contain at least 7 letters and one uppercase letter",
      },
    },

    about: {
      type: String,
      validate: {
        validator: function (value) {
          // Add your validation logic for description here
          return value.length === 0 || value.length <= 300; //
        },
        message:
          "About can either be empty or less than or equal to 300 characters",
      },
    },

    languages: {
      type: [String],
      validate: {
        validator: function (languages) {
          // Validate each language in the array
          for (let language of languages) {
            // Check if the language string contains a space
            if (language.includes(" ")) {
              return false;
            }

            if (language.length === 0) {
              return true;
            }

            // Split the language string by comma
            const splitLanguages = language.split(",");

            for (const splitLanguage of splitLanguages) {
              // Trim the split language and check if it's empty
              if (!splitLanguage.trim()) {
                return false;
              }
            }
          }
          // If all languages are valid
          return true;
        },
        message:
          'Languages must be comma separated list - Fx "english, spanish, french"',
      },
    },
  },
  { timestamps: true }, // Automatically include createdAt and updatedAt fields
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
    title: {
      type: String,
      validate: {
        validator: function (value) {
          // Add your validation logic for title here
          return value.length > 0 && value.length <= 50; // Ensuring it's not empty and has a length less than or equal to 10 characters
        },
        message:
          "Title is required and must be less than or equal to 50 characters",
      },
    },

    image: {
      type: String,
      validate: {
        validator: function (value) {
          // Regular expression to validate URL format
          return (
            value.length === 0 ||
            /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(value)
          );
        },
        message: "Invalid image URL",
      },
    },
    description: {
      type: String,
      validate: {
        validator: function (value) {
          // Add your validation logic for description here
          return value.length === 0 || value.length <= 300; //
        },
        message:
          "Description can either be empty or less than or equal to 500 characters",
      },
    },

    date: {
      type: Date,
      validate: {
        validator: function (value) {
          // Check if the provided date is greater than the current date
          return value > new Date();
        },
        message: "Event date must be in the future",
      },
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    maxParticipants: {
      type: Number,
      validate: {
        validator: function (value) {
          // Check if the provided maxParticipants is greater than 0 and less than 20
          return value > 0 && value < 26;
        },
        message: "Max participants must be greater than 0 and less than 26",
      },
    },

    address: {
      city: {
        type: String,
        validate: {
          validator: function (value) {
            // Add your validation logic for city here
            return value.length > 0; // For example, ensuring it's not empty
          },
          message: "City is required",
        },
      },
      street: {
        type: String,
        validate: {
          validator: function (value) {
            return value.length > 0; // For example, ensuring it's not empty
          },
          message: "Street is required",
        },
      },
      houseNumber: {
        type: String,
      },
    },

    timeFrom: {
      type: String,
      default: "00:00", // Default from time value
      validate: {
        validator: function (time) {
          const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return timeRegex.test(time);
        },
        message: (props) => `${props.value} is not a valid time format (HH:MM)`,
      },
    },
    timeTo: {
      type: String,
      default: "23:59", // Default to time value
      validate: {
        validator: function (time) {
          const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return timeRegex.test(time);
        },
        message: (props) => `${props.value} is not a valid time format (HH:MM)`,
      },
    },

    tags: {
      type: [String],
      validate: {
        validator: function (languages) {
          // Validate each language in the array
          for (let tag of languages) {
            // Check if the language string contains a space
            if (tag.includes(" ")) {
              return false;
            }

            if (tag.length === 0) {
              return true;
            }

            // Split the tag string by comma
            const splitLanguages = tag.split(",");

            for (const splitLanguage of splitLanguages) {
              // Trim the split tag and check if it's empty
              if (!splitLanguage.trim()) {
                return false;
              }
            }
          }
          // If all languages are valid
          return true;
        },
        message: 'Tags must be comma separated list - Fx "charity, run, walk"',
      },
    },
  },
  { timestamps: true }, // Automatically include createdAt and updatedAt fields
);

const commentSchema = new Schema(
  {
    event_id: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      validate: {
        validator: function (value) {
          // Add your validation logic for comment here
          return value.length >= 10 && value.length <= 200; // Ensuring it's between 30 and 300 characters
        },
        message: "Comment must be between 10 and 200 characters",
      },
    },
  },
  { timestamps: true }, // Automatically include createdAt and updatedAt fields
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
  {
    name: "Comment",
    schema: commentSchema,
    collection: "comments",
  },
];
