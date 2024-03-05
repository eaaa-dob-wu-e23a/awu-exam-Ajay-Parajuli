import {  redirect } from '@remix-run/node';
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import mongoose from "mongoose";
import { authenticator } from "../services/auth.server";
import { useNavigate } from "@remix-run/react";

export async function loader({ request }) {
    try {
        const user = await authenticator.isAuthenticated(request, {
            // Check if the user is authenticated and get the user data
            failureRedirect: "/signin",
        });
        // Get the user data from the database
        const updatedUser = await mongoose.models.User.findById(user._id);
        return { user: updatedUser };
    } catch (error) {
        // Handle any errors that occur during the loading process
        console.error(error);
        // You can redirect the user to an error page or handle the error in any other way
        throw new Error("Failed to load user data");
    }
}


export default function UpdateProfile() {
    const { user } = useLoaderData();
    const [image, setImage] = useState(user.image);
    const navigate = useNavigate(); 

    function handleCancel() {
        navigate(-1);
      }
return (
    <div className="flex flex-col justify-center items-center w-full md:h-[95vh] xl:h-[85vh]">
    <h1 className="mt-2 font-bold text-3xl">GetFit</h1>
<Form className="flex flex-col shadow-2xl p-4 rounded-xl w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%]" id="sign-up-form" method="post">
<h2 className="border-gray-300 mb-4 pb-3 border-b-2 font-medium text-xl">Update Profile</h2>
<div>
</div>
<div className="flex justify-between mb-4 w-full">
<div className="w-[100%]">
<label htmlFor="firstname"><span className="block after:content-['*'] after:ml-0.5 font-medium text-slate-700 text-sm after:text-red-500">
Firstname
</span></label>
<input className="border-2 border-gray-300 p-1 rounded w-[97%]"
  id="firstname"
  type="text"
  name="firstname"
  aria-label="firstname"
  defaultValue={user.firstname}
  placeholder="Type your firstname..."
  autoComplete="off"
/>
</div>
<div className="w-[100%]">

<label className="bg-black w-full" htmlFor="lastname"><span className="block after:content-['*'] after:ml-0.5 font-medium text-slate-700 text-sm after:text-red-500">
Lastname
</span>

<input className="border-2 border-gray-300 p-1 rounded w-full"
  id="lastname"
  type="text"
  name="lastname"
  aria-label="lastname"
    defaultValue={user.lastname}
  placeholder="Type your lastname..."
  autoComplete="off"
/>
   </label>
</div>


</div>




<div className="flex flex-col mb-4">
<label className="font-medium text-slate-700 text-sm" htmlFor="address">Address</label>
<input
className="border-2 border-gray-300 p-1 rounded w-full"
  id="address"
  type="text"
  name="address"
  aria-label="address"
    defaultValue={user.address}
  placeholder="City, Country..."
  autoComplete="off"
/>

</div>

<div className="flex flex-col mb-4">

<label className="font-medium text-slate-700 text-sm" htmlFor="languages">Languages</label>
<input
className="border-2 border-gray-300 p-1 rounded w-full"
  id="languages"
  type="text"
  name="languages"
    defaultValue={user.languages}
  aria-label="languages"
  placeholder="fx. english, french, spanish..."
  autoComplete="off"
/>

</div>

<fieldset className="flex mb-4">
  <legend className="font-medium text-slate-700 text-sm">Gender:</legend>
  <input className="mr-2" type="radio" defaultChecked={user.gender === "Male"} id="male" name="gender" value="Male" />
  <label className="mr-4" htmlFor="male">Male</label>
  <br />
  <input className="mr-2" type="radio" id="female" name="gender" defaultChecked={user.gender === "Female"} value="Female" />
  <label className="mr-4" htmlFor="female">Female</label>
  <br />
  <input className="mr-2" type="radio" id="other" name="gender" defaultChecked={user.gender === "Other"} value="Other" />
  <label className="mr-4" htmlFor="other">Other</label>
</fieldset>
<div className="flex flex-col">
              <label className='font-medium text-slate-700 text-sm' htmlFor="image">Image URL:</label>

              <input
                name="image"
                className="border-2 border-gray-300 p-1 rounded w-full"
                defaultValue={user.image}
                type="url"
                onChange={e => setImage(e.target.value)}
                placeholder="Paste an image URL..."
              />
                <div className="mt-1">
              <label className="" htmlFor="image-preview">Image Preview</label>
              <img
                id="image-preview"
                className="rounded w-[350px] object-cover"
                src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
                alt="Choose"
                onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
              />
              </div>
            </div>
<div className="flex justify-between mt-2 w-full text-white">
  <button className="bg-black p-2 rounded text-lg" type="submit">Update</button>
  <button className="bg-red-600 p-2 rounded text-lg" onClick={handleCancel}>Cancel</button>
</div>
</Form>
</div>
);
}