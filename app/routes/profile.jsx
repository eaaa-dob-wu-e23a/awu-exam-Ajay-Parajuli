import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "../services/auth.server";

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
    return { user: updatedUser };
  }




export default function Profile() {
    const loaderData = useLoaderData();

return (
    <>
        <h1 className="p-3 font-medium text-2xl text-center">Profile</h1>
        <div className="shadow-2xl p-5 leading-7">
            <div className="flex flex-col">
                <img
                    src={loaderData.user.image}
                    alt="user"
                    className="rounded-sm"
                />
                <h2 className="mt-3 font-medium text-2xl">
                    {loaderData.user.firstname} {loaderData.user.lastname}
                </h2>
                <p className="text-gray-500">{loaderData.user.mail}</p>
                <p className="text-gray-500">Age: {loaderData.user.age}</p>
                <p className="text-gray-500">Gender: {loaderData.user.gender}</p>
                <p className="text-gray-500">Languages: {loaderData.user.languages.map((language, index) => (
                    <span key={language}>
                        {language}{index !== loaderData.user.languages.length - 1 ? ', ' : ''}
                    </span>
                ))}</p>
                <p className="text-gray-500">Address: {loaderData.user.address}</p>
                
                <div className="mt-5">
                    <Link to="/update-profile" className="bg-black p-2 rounded text-white">Edit profile</Link>
                </div>
            </div>
        </div>
    </>
);
}

