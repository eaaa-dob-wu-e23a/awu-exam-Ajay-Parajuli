import { authenticator } from "../services/auth.server";
import mongoose from "mongoose";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";


export const meta = () => {
    return [{ title: "GetFit app" }];
  };

  export async function loader({ request, params }) {
    // Ensure the user is authenticated
    const authUser = await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin",
    });
    // Load the event and the user who created it
    const event = await mongoose.models.Event.findById(params.eventId).populate("created_by");

    const users = await mongoose.models.User.find({ _id: { $in: event.participants } });
    console.log(users);
  

    return json({ event, authUser, users});
  }


export default function Event() {
    const { event, authUser, users } = useLoaderData();
    return(
      <>
      <div>
        <div className="relative">
          <img className=""  src={event.image} alt={event.description} />
          <h1 className="top-1/2 left-1/2 absolute bg-white bg-opacity-75 rounded w-[90%] font-medium text-center text-lg transform -translate-x-1/2 -translate-y-1/2">{event.description}</h1>
          </div>
          <div className="flex mb-2 p-2">
        <img className="rounded-full w-[50px] h-[50px] object-cover" src={event.created_by.image} alt={event.created_by.firstname} />
        <span className="ml-2">
          <h3 className="font-medium text-black">{event.created_by.firstname} {event.created_by.lastname}</h3>
          <p>{event.created_by.mail}</p>
        </span>
      </div>
      <div className="p-2">
        <h3 className="font-medium">About me</h3>
        <p className="text-gray-500">Languages: {event.created_by.languages.map((language, index) => (
            <span key={language}>
                {language}{index !== event.created_by.languages.length - 1 ? ', ' : ''}
            </span>
        ))}</p>
        <p className="text-gray-500">Age: {event.created_by.age}</p>
      </div>

          <p>{event.date}</p>
          <p>{event.address}</p>
          <p>{event.maxParticipants}</p>
          <p>{event.organizer}</p>
      </div>
        <div className="text-black">
            {users.map((user) => (
                <div key={user._id}>
                    <p>{user.firstname}</p>
                </div>
            ))
            }
        </div>
        </>   
    );
}