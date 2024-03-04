import mongoose from "mongoose";

export default async function seedDb() {
  const User = mongoose.model("User");
  const Event = mongoose.model("Event");

  const userCount = await User.countDocuments();
  const eventCount = await Event.countDocuments();

  if (userCount === 0 || eventCount === 0) {
    console.log("Seeding database...");
    insertData(User, Event);
  }
}

async function insertData(User, Event) {
  const Dan = await User.create({
    image: "https://example.com/user1.jpg",
    mail: "user1@example.com",
    firstname: "Dan",
    lastname: "Smith",
    age: 30,
    gender: "Male",
    password: "Password123",
    languages: ["English", "Spanish"],
    address: "123 Main Street, Cityville"
  });

  const Kasper = await User.create({
    image: "https://example.com/user2.jpg",
    mail: "user2@example.com",
    firstname: "Kasper",
    lastname: "Johnson",
    age: 25,
    gender: "Female",
    password: "SecurePass456",
    languages: ["English", "French"],
    address: "456 Elm Street, Townsville"
  });

  const events = await Event.insertMany([
    {
      image: "https://example.com/event1.jpg",
      description: "A fun picnic in the park.",
      date: new Date("2024-03-10"),
      created_by: Dan._id,
      participants: [Dan._id, Kasper._id],
      maxParticipants: 50,
      address: "Central Park, New York"
    },
    {
      image: "https://example.com/event2.jpg",
      description: "Charity run for a local cause.",
      date: new Date("2024-04-15"),
      created_by: Dan._id,
      participants: [Kasper._id, Dan._id],
      maxParticipants: 100,
      address: "City Stadium, Springfield"
    }
  ]);

  console.log("Database seeded successfully with users and events:", events);
}
