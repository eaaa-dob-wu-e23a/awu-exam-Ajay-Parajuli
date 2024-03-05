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
        <div className="xl:flex xl:flex-col xl:justify-center xl:items-center shadow-2xl xl:shadow-none p-5 xl:w-full xl:h-[80vh] leading-7 x">
        <h1 className="p-3 font-medium text- text-2xl">Profile</h1>
            <div className="flex xl:flex-row flex-col bg-white xl:shadow-2xl xl:w-[70%]">
                <img
                    src={loaderData.user.image}
                    alt="user"
                    className="rounded-sm xl:w-[40%]"
                />
                <div className="mt-5 xl:ml-5">
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
              

                <div className="flex justify-between mt-5 w-full">
                    <Link to="/update-profile" className="bg-black p-2 rounded text-white">Edit profile</Link>
                    <Form method="post">
        <button className="bg-red-600 p-2 rounded text-gray-200">Logout</button>
      </Form>
                </div>
                </div>
            </div>
        </div>
    </>
);
}

