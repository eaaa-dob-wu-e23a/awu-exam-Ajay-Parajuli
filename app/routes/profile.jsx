import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "../services/auth.server";
import { useState } from "react";
import {  format } from 'date-fns';
import mongoose from "mongoose";
import { redirect } from "@remix-run/node";


export const meta = () => {
    return [{ title: "GetFit app" }];
    
}

export async function loader({ request }) {
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin"
    });
    const updatedUser = await mongoose.models.User.findById(user._id);
    const myevents = await mongoose.models.Event.find({
        participants: { $in: [user._id] }
    });

    console.log(myevents);
  
    return { user: updatedUser, myevents };
  }




  export default function Profile() {
    const {user, myevents} = useLoaderData(); // Using useLoaderData hook to access loader data
    const [image, setImage] = useState(user.image);

    return (
        <>
            <div className="xl:flex xl:flex-col xl:justify-center shadow-2xl xl:items-center xl:shadow-none p-5 xl:w-full xl:h-[90vh]">
                <h1 className="p-3 font-medium text- text-2xl">Profile</h1>
                <div className="flex xl:flex-row flex-col bg-white xl:shadow-2xl xl:w-[70%]">
                    <img
                        src={image ? image : "https://placehold.co/600x400?text=Profile+image"}
                        alt="user"
                        className="rounded-sm xl:w-[40%]"
                    />
                    <div className="flex flex-col justify-around mt-2 xl:ml-5">
                        <h2 className="font-medium text-2xl">
                            {user.firstname} {user.lastname}
                        </h2>
                        <div className="leading-7">
                        <p className="text-gray-500">{user.mail}</p>
                        <p className="text-gray-500">Age: {user.age}</p>
                        <p className="text-gray-500">Gender: {user.gender}</p>
                        <p className="text-gray-500">Languages: {user.languages.map((language, index) => (
                            <span key={language}>
                                {language}{index !== user.languages.length - 1 ? ', ' : ''}
                            </span>
                        ))}</p>
                        </div>

                        <div className="flex justify-between mt-5 w-full">
                            <Link to="/update-profile" className="bg-black p-2 rounded text-white">Edit profile</Link>
                            <Form method="post">
                                <button className="bg-red-600 p-2 rounded text-gray-200">Logout</button>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="xl:w-[70%]">
                    <h2 className="mt-5 font-medium text-2xl">Registered events</h2>
                    <div className="flex flex-col justify-start">
                        {myevents.map((event) => (
                            <div key={event._id} className="flex justify-between items-center p-2 border-b-2">
                                <div>
                                    <h3 className="font-medium text-xl">{event.title}</h3>
                                    <p>{event.description}</p>
                                    <p>Date: {format(new Date(event.date), "yyyy-MM-dd")}</p>
                                </div>
                                <Link to={`/events/${event._id}`} className="bg-black p-2 rounded text-white">View</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}


export async function action({ request }) {
    const user = await authenticator.isAuthenticated(request);
    if (user) { // if user is authenticated
      await authenticator.logout(request, { redirectTo: "/signin" });
    } else {
      redirect("/signin");
    }
  }

