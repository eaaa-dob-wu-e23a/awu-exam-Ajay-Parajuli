import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate, useActionData } from "@remix-run/react";
import mongoose from "mongoose";
import { useState } from "react";
import { authenticator } from "../services/auth.server";
import {  format } from 'date-fns';


export function meta() {
  return [
    {
      title: "Getfitapp - Update",
    },
  ];
}

export async function loader({ request, params }) {
    await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin",
    });
  // Get the event data from the database
    const event = await mongoose.models.Event.findById(params.eventId);
    return json({ event });

  }


export default function UpdateEvent() {
    const actionData = useActionData();
    const { event } = useLoaderData();
  const [image, setImage] = useState(event.image);
  const navigate = useNavigate();
  const [currentErrorIndex, setCurrentErrorIndex] = useState(0); // State to track the current error index


  function handleCancel() {
    navigate(-1);
  }
    

return(
    <div className=" flex flex-col justify-center items-center w-full md:h-[90vh] xl:h-[100vh] relative">
<Form className="flex flex-col shadow-2xl p-4 rounded-xl w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%]" id="sign-up-form" method="post">
<h2 className="border-gray-300 mb-4 pb-3 border-b-2 font-medium text-xl">Update Event</h2>
<div>
<div className="bg-red-500 mb-3 rounded w-full text-center">
          {actionData?.errors && Object.keys(actionData.errors).length > 0 && (
            <p className="p-1 text-white">
              {Object.values(actionData.errors)[currentErrorIndex].message}
            </p>
          )}
        </div>
</div>
<div className="flex flex-col mb-4">
<label className="font-medium text-slate-700 text-sm" htmlFor="title">
<span className="block after:content-['*'] after:ml-0.5 font-medium text-slate-700 text-sm after:text-red-500">
Title
</span>
</label>
<input
className="border-2 border-gray-300 p-1 rounded w-full"
  id="title"
  type="text"
  name="title"
  aria-label="title"
    defaultValue={event.title}
  placeholder=""
  autoComplete="off"
/>

</div>


<div className="flex flex-col mb-4">

<label className="font-medium text-slate-700 text-sm" htmlFor="Date"> <span className="block after:content-['*'] after:ml-0.5 font-medium text-slate-700 text-sm after:text-red-500">
Date
</span></label>
<input
className="border-2 border-gray-300 p-1 rounded w-full"
  id="date"
  type="date"
  name="date"
  defaultValue={format(new Date(event.date), "yyyy-MM-dd")}
  aria-label="date"
  placeholder="fx. english, french, spanish..."
  autoComplete="off"
/>

</div>

<div className="flex flex-col mb-4">

<label className="font-medium text-slate-700 text-sm" htmlFor="maxparticipants"> <span className="block after:content-['*'] after:ml-0.5 font-medium text-slate-700 text-sm after:text-red-500">
Nr. of Participants
</span></label>
<input
className="border-2 border-gray-300 p-1 rounded w-full"
  id="MaxParticipants"
  type="number"
  name="maxParticipants"
  max={10}
  defaultValue={event.maxParticipants}
  aria-label="maxParticipants"
  autoComplete="off"
/>

</div>



<div className="flex justify-between mb-4 w-full">
<div className="w-[90%]">

<label htmlFor="housenr"><span className="block after:content-['*'] after:ml-0.5 font-medium text-slate-700 text-sm after:text-red-500">
City
</span></label>
<input className="border-2 border-gray-300 p-1 rounded w-[90%]"
  id="city"
  type="text"
  name="city"
  aria-label="city"
  defaultValue={event.address.city}
  placeholder="City..."
  autoComplete="off"
/>
</div>
<div className="w-[90%] flex justify-center flex-col">

<label htmlFor="housenr">
    <span className="block after:content-['*'] after:ml-0.5 font-medium text-slate-700 text-sm after:text-red-500">
Street
</span></label>

<input className="border-2 border-gray-300 p-1 rounded w-[90%]"
  id="street"
  type="text"
  name="street"
  aria-label="street"
    defaultValue={event.address.street}
  placeholder="street"
  autoComplete="off"
/>
  
</div>

<div className="w-[90%] flex justify-end flex-col">

<label className="text-slate-700 text-sm font-medium" htmlFor="housenr">Housenr.</label>

<input className="border-2 border-gray-300 p-1 rounded w-[90%]"
  id="housenumber"
  type="text"
  name="housenumber"
  aria-label="housenumber"
    defaultValue={event.address.houseNumber}
  placeholder="housenumber..."
  autoComplete="off"
/>
  
</div>


</div>






<div className="w-full mb-4">
<label htmlFor="description">Description</label>
<textarea className="border-2 border-gray-300 p-1 rounded w-full h-[100px] resize-none "
  id="description"
  type="text"
  name="description"
  aria-label="description"
  defaultValue={event.description}
  autoComplete="off"
/>
</div>

<div className="flex flex-col">
              <label className='font-medium text-slate-700 text-sm' htmlFor="image">Image URL:</label>

              <input
                name="image"
                className="border-2 border-gray-300 p-1 rounded w-full"
                defaultValue={event.image}
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