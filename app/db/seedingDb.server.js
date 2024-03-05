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
    image: "https://www.eaaa.dk/media/bdojel41/dan-okkels-brendstrup.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921559630000&format=webp",
    mail: "user50@example.com",
    firstname: "Dan",
    lastname: "Smith",
    age: 30,
    gender: "Male",
    password: "Password123",
    languages: ["English", "Spanish"],
    address: "Copenhagen, Denmark"
  });

  const Kasper = await User.create({
    image: "https://share.cederdorff.dk/images/race.webp",
    mail: "user10@example.com",
    firstname: "Kasper",
    lastname: "Johnson",
    age: 25,
    gender: "Female",
    password: "SecurePass456",
    languages: ["English", "French"],
    address: "Aarhus, Denmark"
  });

  const Sarah = await User.create({
    image: "https://www.baaa.dk/media/5buh1xeo/anne-kirketerp.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921531600000&format=webp",
    mail: "user1@example.com",
    firstname: "Sarah",
    lastname: "Doe",
    age: 30,
    gender: "Male",
    password: "Password123",
    languages: ["English", "French"],
    address: "Oddense, Denmark"
  });

  const Maria = await User.create({
    image: "https://www.baaa.dk/media/b5ahrlra/maria-louise-bendixen.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921650330000&format=webp",
    mail: "user2@example.com",
    firstname: "Jane",
    lastname: "Smith",
    age: 25,
    gender: "Female",
    password: "Secret@123",
    languages: ["Spanish", "German"],
    address: "Kolding, Denmark"
  });  

  const John = await User.create({
    image: "https://example.com/user3.jpg",
    mail: "user3@example.com",
    firstname: "Michael",
    lastname: "Johnson",
    age: 40,
    gender: "Male",
    password: "P@ssw0rd!",
    languages: ["English"],
    address: "Aalborg, Denmark"
  });

  const events = await Event.insertMany([
    {
      image: "https://picsum.photos/800/600",
      description: "A fun picnic in the park.",
      date: new Date("2024-03-10"),
      created_by: Dan._id,
      participants: [Dan._id, Kasper._id],
      maxParticipants: 50,
      address: "Central Park, New York"
    },
    {
      image: "https://picsum.photos/800/600",
      description: "Charity run for a local cause.",
      date: new Date("2024-04-15"),
      created_by: Dan._id,
      participants: [Kasper._id, Dan._id],
      maxParticipants: 100,
      address: "City Stadium, Springfield"
    },
    {
      image: "https://picsum.photos/800/600",
      description: "Hiking Adventure - Nature Trails",
      date: "2024-07-05",
      created_by: John._id,
      participants: [John._id, Maria._id, Sarah._id],
      maxParticipants: 15,
      address: "101 Adventure Ave, Trailsville",
      organizer: "Trail Blazers Club"
    },
    {
      image: "https://picsum.photos/800/600",
      description: "Photography Workshop - Capturing Moments",
      date: "2024-08-15",
      created_by: Maria._id,
      participants: [Maria._id, Sarah._id, Dan._id, Kasper._id, John._id],
      maxParticipants: 25,
      address: "202 Shutter St, Photoville",
      organizer: "Pixel Perfect Studios"
    },
    {
      image: "https://picsum.photos/800/600",
      description: "Zumba Class - Italian Dance Fitness",
      date: "2024-06-10",
      created_by: Sarah._id,
      participants: [Sarah._id, Dan._id, Kasper._id, John._id, Maria._id],
      maxParticipants: 20,
      address: "789 Gourmet Rd, Foodtown",
      organizer: "Zumba Fitness Club"
    }  
]);


  console.log("Database seeded successfully with users and events:", events);
}
