import mongoose from "mongoose";

export default async function seedDb() {
  const User = mongoose.model("User");
  const Event = mongoose.model("Event");
  const Comment = mongoose.model("Comment");


  const userCount = await User.countDocuments();
  const eventCount = await Event.countDocuments();
  const commentCount = await Comment.countDocuments();

  if (userCount === 0 || eventCount === 0 || commentCount === 0) {
    console.log("Seeding database...");
    insertData(User, Event, Comment);
  }
}

async function insertData(User, Event, Comment) {
  const Dan = await User.create({
    image: "https://www.eaaa.dk/media/bdojel41/dan-okkels-brendstrup.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921559630000&format=webp",
    mail: "user50@example.com",
    firstname: "Dan",
    lastname: "Smith",
    age: 30,
    about: "I am a fitness enthusiast and love to stay active. I enjoy outdoor activities and meeting new people. I am looking forward to meeting new friends and participating in fun events.",
    gender: "Male",
    password: "Password123",
    languages: ["English", "Spanish"],
  });

  const Kasper = await User.create({
    image: "https://share.cederdorff.dk/images/race.webp",
    mail: "user10@example.com",
    firstname: "Kasper",
    lastname: "Johnson",
    age: 25,
    about: "I am a software developer and enjoy coding and building new applications. I am also a fitness enthusiast and enjoy outdoor activities. I am looking forward to meeting new friends and participating in fun events.",
    gender: "Female",
    password: "SecurePass456",
    languages: ["English", "French"],
  });

  const Sarah = await User.create({
    image: "https://www.baaa.dk/media/5buh1xeo/anne-kirketerp.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921531600000&format=webp",
    mail: "user1@example.com",
    firstname: "Sarah",
    lastname: "Doe",
    age: 30,
    about: "I am a gamer and enjoy playing video games. I am also a fitness enthusiast and enjoy outdoor activities. I am looking forward to meeting new friends and participating in fun events.",
    gender: "Male",
    password: "Password123",
    languages: ["English", "French"],
  });

  const Maria = await User.create({
    image: "https://www.baaa.dk/media/b5ahrlra/maria-louise-bendixen.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921650330000&format=webp",
    mail: "user2@example.com",
    firstname: "Jane",
    lastname: "Smith",
    age: 25,
    about: "I am proffesion football player and I love to eat indian food.",
    gender: "Female",
    password: "Secret@123",
    languages: ["Spanish", "German"],
  });  

  const John = await User.create({
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww",
    mail: "user3@example.com",
    firstname: "Michael",
    lastname: "Johnson",
    age: 40,
    about: "I am an actor and enjoy performing in theater. I am also a fitness enthusiast and enjoy outdoor activities. I am looking forward to meeting new friends and participating in fun events.",
    gender: "Male",
    password: "P@ssw0rd!",
    languages: ["English"],
  });

  const Emily = await User.create({
    image: "https://images.unsplash.com/photo-1664575603992-0f17b771dd91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW58ZW58MHx8MHx8fDA%3D",
    mail: "user6@example.com",
    firstname: "Emily",
    lastname: "Brown",
    age: 28,
    about: "I love to travel and explore new places. I am also a fitness enthusiast and enjoy outdoor activities. I am looking forward to meeting new friends and participating in fun events.",
    gender: "Female",
    password: "StrongPassword123",
    languages: ["English", "Italian"],
  });

  const David = await User.create({
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww",
    mail: "user7@example.com",
    firstname: "David",
    lastname: "Lee",
    age: 35,
    about: "My passion is music and I enjoy playing the guitar. I am also a fitness enthusiast and enjoy outdoor activities.",
    gender: "Male",
    password: "SecurePass789",
    languages: ["English", "Mandarin"],
  });

  const Sophia = await User.create({
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHx8fDA%3D",
    mail: "user8@example.com",
    firstname: "Sophia",
    lastname: "Garcia",
    age: 31,
    about: "I am a fashion designer and enjoy creating new designs. I enjoy outdoor activities. I am looking forward to meeting new friends and participating in fun events.",
    gender: "Female",
    password: "Passw0rd!321",
    languages: ["English", "Spanish"],
  });

  const James = await User.create({
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    mail: "user9@example.com",
    firstname: "James",
    lastname: "Miller",
    age: 40,
    about: "I am a chef and enjoy cooking new dishes. I enjoy outdoor activities. I am looking forward to meeting new friends and participating in fun events.",
    gender: "Male",
    password: "Secret123!",
    languages: ["English", "German"],
  });

  const Emma = await User.create({
    image: "https://plus.unsplash.com/premium_photo-1689266188052-704d33673e69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D",
    mail: "user13@example.com",
    firstname: "Emma",
    lastname: "Martinez",
    age: 27,
    about: "I am a photographer and enjoy capturing moments. I enjoy outdoor activities. I am looking forward to meeting new friends and participating in fun events.",
    gender: "Female",
    password: "Passw0rd@456",
    languages: ["English", "French"],
  });

  const events = await Event.insertMany([
    {
        image: "https://picsum.photos/800/600",
        description: "A fun picnic in the park.",
        title: "Picnic in the Park",
        date: new Date("2024-03-30"),
        created_by: John._id,
        timeFrom: "10:00", 
        timeTo: "14:00",  
        participants: [John._id, Kasper._id],
        maxParticipants: 20,
        address: {
            city: "Miami",
            street: "Ocean Drive",
            houseNumber: ""
        },
        tags: ["picnic", "park", "fun"]
    },
    {
        image: "https://picsum.photos/800/600",
        description: "Charity run for a local cause.",
        title: "Charity Run",
        date: new Date("2024-04-15"),
        created_by: Dan._id,
        timeFrom: "08:00",
        timeTo: "12:00",
        participants: [Kasper._id, Dan._id],
        maxParticipants: 10,
        address: {
            city: "New York",
            street: "Central Park West",
            houseNumber: "87"
        },
        tags: ["charity", "run", "cause"]
    },
    {
        image: "https://picsum.photos/800/600",
        description: "Hiking Adventure - Nature Trails",
        date: "2024-07-05",
        title: "Hiking Adventure",
        timeFrom: "09:00",
        timeTo: "15:00",
        created_by: John._id,
        participants: [John._id, Maria._id, Sarah._id],
        maxParticipants: 5,
        address: {
            city: "London",
            street: "Trafalgar Square",
            houseNumber: "73"
        },
        tags: ["hiking", "adventure", "nature"]
    },
    {
        image: "https://picsum.photos/800/600",
        description: "Photography Workshop - Capturing Moments",
        title: "Photography Workshop",
        date: "2024-08-15",
        timeFrom: "11:00",
        timeTo: "17:00",
        created_by: Maria._id,
        participants: [Maria._id, Sarah._id, Dan._id, Kasper._id, John._id],
        maxParticipants: 8,
        address: {
            city: "Denver",
            street: "Mountain View Road",
            houseNumber: "20"
        },
        tags: ["photography", "workshop", "capturing"]
    },
    {
        image: "https://picsum.photos/800/600",
        description: "Zumba Class - Italian Dance Fitness",
        title: "Zumba Class",
        date: "2024-06-10",
        timeFrom: "18:00",
        timeTo: "20:00",
        created_by: Sarah._id,
        participants: [Sarah._id, Dan._id, Kasper._id, John._id, Maria._id],
        maxParticipants: 9,
        address: {
            city: "Paris",
            street: "Rue de Rivoli",
            houseNumber: "45"
        },
        tags: ["zumba", "fitness", "dance"]
    },
    {
        image: "https://picsum.photos/800/600",
        description: "Soccer tournament for charity.",
        title: "Charity Soccer Tournament",
        date: new Date("2024-09-20"),
        created_by: Emily._id,
        timeFrom: "14:00",
        timeTo: "18:00",
        participants: [Emily._id, David._id],
        maxParticipants: 15,
        address: {
            city: "Los Angeles",
            street: "Sunset Boulevard",
            houseNumber: "123"
        },
        tags: ["charity", "soccer", "tournament"]
    },
    {
        image: "https://picsum.photos/800/600",
        description: "Art exhibition showcasing local artists.",
        title: "Local Art Exhibition",
        date: new Date("2024-10-25"),
        timeFrom: "12:00",
        timeTo: "16:00",
        created_by: Emily._id,
        participants: [Emily._id, Sophia._id],
        maxParticipants: 20,
        address: {
            city: "San Francisco",
            street: "Market Street",
            houseNumber: "456"
        },
        tags: ["art", "exhibition", "local"]
    },
    {
        image: "https://picsum.photos/800/600",
        description: "Cooking class learning international cuisines.",
        title: "International Cooking Class",
        date: new Date("2024-11-15"),
        created_by: Sophia._id,
        timeFrom: "17:00",
        timeTo: "21:00",
        participants: [Sophia._id, James._id],
        maxParticipants: 12,
        address: {
            city: "Chicago",
            street: "Lake Shore Drive",
            houseNumber: "789"
        },
        tags: ["cooking", "international", "cuisine"]
    },
    {
        image: "https://picsum.photos/800/600",
        description: "Book club discussing contemporary literature.",
        title: "Contemporary Literature Book Club",
        date: new Date("2024-12-10"),
        timeFrom: "16:00",
        timeTo: "18:00",
        created_by: James._id,
        participants: [James._id, Emma._id],
        maxParticipants: 10,
        address: {
            city: "Boston",
            street: "Newbury Street",
            houseNumber: "1011"
        },
        tags: ["book", "literature", "contemporary"]
    },
    {
        image: "https://picsum.photos/800/600",
        description: "Gardening workshop exploring urban gardening techniques.",
        title: "Urban Gardening Workshop",
        date: new Date("2025-01-05"),
        created_by: Emma._id,
        timeFrom: "10:00",
        timeTo: "14:00",
        participants: [Emma._id, Dan._id, Kasper._id],
        maxParticipants: 20,
        address: {
            city: "Seattle",
            street: "Pike Place",
            houseNumber: "1213"
        },
        tags: ["gardening", "workshop", "urban"]
    }
]);


  const comments = await Comment.insertMany([
    {
      event_id: events[0]._id,
    user_id: Dan._id,
    comment: "This looks like a great event!"
    },
  ]);

  console.log("Database seeded successfully with users and events:", events);
}
