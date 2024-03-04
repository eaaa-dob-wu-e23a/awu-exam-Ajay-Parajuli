import mongoose from "mongoose";

export default async function seedDb() {
  const userCount = await mongoose.models.User.countDocuments();
  if (userCount === 0) {
    console.log("Seeding database...");
    insertData();
  }
}

async function insertData() {
  const users = [
  
  ];
  await mongoose.models.User.insertMany(users);
}
