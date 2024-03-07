import { authenticator } from "../services/auth.server";
import mongoose from "mongoose";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useFetcher } from "@remix-run/react";


export const meta = () => {
  return [{ title: "GetFit app" }];
};

export async function loader({ request, params }) {
  try {
    // Ensure the user is authenticated
    const authUser = await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin",
    });
    // Load the event and the user who created it
    const event = await mongoose.models.Event.findById(params.eventId).populate("created_by");

    const users = await mongoose.models.User.find({ _id: { $in: event.participants } });

    return json({ event, authUser, users });
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to be handled by Remix or other error handling middleware
  }
}

export default function Event() {
  const Fetcher = useFetcher();
  const { event, authUser, users } = useLoaderData();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  function confirmDelete(event) {
    const response = confirm("Please confirm you want to delete this post.");
    if (!response) {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className="shadow-xl m-auto mb-10 xl:w-[50%]">
        <div className="relative w-full">
          <img className="rounded w-full lg:h-[400px] object-cover" src={event.image} alt={event.title} />
          <h1 className="top-1/2 left-1/2 absolute bg-white bg-opacity-75 rounded w-[90%] font-medium text-center text-lg transform -translate-x-1/2 -translate-y-1/2">{event.title}</h1>
        </div>
        <div className="lg:flex lg:flex-row-reverse lg:justify-between">
          <div>
            <h3 className="mb-1 p-2 font-medium text-lg">About me</h3>
            <div className="flex p-2">
              <img className="rounded-full w-[50px] h-[50px] object-cover" src={event.created_by.image} alt={event.created_by.firstname} />
              <span className="ml-2">
                <h3 className="font-medium text-black">{event.created_by.firstname} {event.created_by.lastname}</h3>
                <p>{event.created_by.mail}</p>
              </span>
            </div>
            <div className="p-2 leading-7">
              <p className="text-gray-500">Languages: {event.created_by.languages.map((language, index) => (
                <span key={language}>
                  {language}{index !== event.created_by.languages.length - 1 ? ', ' : ''}
                </span>
              ))}</p>
              <p className="text-gray-500">Age: {event.created_by.age}</p>
              <p className="text-gray-500">Gender: {event.created_by.gender}</p>
            </div>
            <div className="pl-2 leading-6">
              <h3 className="font-medium">Bio</h3>
              <p className="text-gray-500">About: {event.created_by.about}</p>
            </div>
          </div>
          <div>
            <div className="p-2 leading-7">
              <h3 className="mb-1 font-medium text-lg">About the Event</h3>
              <p className="text-gray-500">Event date: {formatDate(event.date)}</p>
              <p className="text-gray-500">Event address: {event.address.city}, {event.address.street} {event.address.houseNumber}</p>
              <p className="text-gray-500">Available slots: {event.maxParticipants}</p>
            </div>
            <div className="pl-2">
              <h3 className="font-medium">Description:</h3>
              <p className="text-gray-500">{event.description}</p>
            </div>
          </div>
        </div>
        <h3 className="mb-1 p-2 font-medium text-lg">People who are going</h3>
        <div className="flex p-2 w-full text-black">
          {users.map((user) => (
            <div className="mr-4" key={user._id}>
              <img className="rounded-full w-[50px] h-[50px] object-cover" src={user.image} alt={user.firstname} />
              <p className="text-center">{user.firstname}</p>
            </div>
          ))}
        </div>
        <div>
          {authUser._id === event.created_by._id && (
            <div className="flex mt-5 pb-5">
              <Form action="update">
                <button className="bg-black mr-5 ml-5 p-1 rounded text-white">Update</button>
              </Form>
              <Form action="destroy" method="post"  onSubmit={confirmDelete}>
                <button className="bg-red-600 p-1 rounded text-white">Delete</button>
              </Form>
            </div>
          )}
          {/* Render the join event button only if the authUser._id is not the same */}
    
  <Fetcher.Form method="post">
    {event.participants.includes(authUser._id) ? (
      <button className="bg-red-500 p-2 rounded w-full text-white" type="submit">Leave event</button>
    ) : (
      <button className="bg-blue-500 p-2 rounded w-full text-white" type="submit">Join event</button>
    )}
  </Fetcher.Form>

        </div>
      </div>
    </>
  );
}

export async function action({ request, params }) {
  try {
    // Protect the route
    const authUser = await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin",
    });

    const user = await mongoose.models.User.findById(authUser._id);
    const event = await mongoose.models.Event.findById(params.eventId);

    if (!event) {
      throw new Error('Event not found');
    }

    const participantIndex = event.participants.indexOf(user._id);
    if (participantIndex !== -1) {
      event.participants.splice(participantIndex, 1); // Remove the user from the participants array
      await event.save();
    } else {
      // Add the user to the participants array
      event.participants.push(user._id);
      await event.save();
    }

    // Redirect to the event page
    return redirect("#");

  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to be handled by Remix or other error handling middleware
  }
}

