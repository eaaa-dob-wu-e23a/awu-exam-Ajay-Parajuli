import { json, redirect } from "@remix-run/node";
import { Form, useNavigate, useActionData } from "@remix-run/react";
import mongoose from "mongoose";
import { useState } from "react";
import { authenticator } from "../services/auth.server";


export function meta() {
  return [
    {
      title: "Getfitapp - Create",
    },
  ];
}

export async function loader({ request }) {
    return await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin",
    });

  }


export default function CreateEvent() {
    const actionData = useActionData();
  const navigate = useNavigate();
  const [image, setImage] = useState(
    "https://placehold.co/600x400?text=Add+your+amazing+image"
  );
  const [currentErrorIndex, setCurrentErrorIndex] = useState(0); // State to track the current error index


  function handleCancel() {
    navigate(-1);
  }
    

return(
    <div className=" flex flex-col justify-center items-center w-full md:h-[90vh] xl:h-[90vh] relative">
<Form className="flex bg-background flex-col shadow-2xl p-4 rounded-xl w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%] xl:h-[80vh] xl:mt-[10px] xl:overflow-y-auto border-b-2 border-l-2 border-border" id="sign-up-form" method="post">
<h2 className="border-border mb-4 pb-3 border-b-2 font-medium text-xl text-secondary">Create Event</h2>

<div className="flex flex-col mb-4">
<label className="font-medium text-secondary text-sm" htmlFor="title">
<span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-btntwo">
Title
</span>
</label>
<input
className="border-2 border-border bg-background text-secondary p-1 rounded w-full"
  id="title"
  type="text"
  name="title"
  aria-label="title"
  placeholder="Title of the event.."
  autoComplete="off"
/>

</div>


<div className="flex flex-col mb-4">

<label className="font-medium text-secondary text-sm" htmlFor="Date"> <span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-btntwo">
Date
</span></label>
<input
className="border-2 border-border bg-background text-secondary p-1 rounded w-full"
  id="date"
  type="date"
  name="date"
  aria-label="date"
  placeholder="Date of the event.."
  autoComplete="off"
/>

</div>

<div className="flex flex-col mb-4">

<label className="font-medium text-secondary text-sm" htmlFor="Time"> <span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-btntwo">
Time
</span></label>
<div className="flex justify-between">
  <div className="w-[45%]">
<label className="text-secondary text-sm" htmlFor="TimeFrom">From:</label>
<input className="border-2 bg-background text-secondary border-border p-1 rounded w-full" type="time" id="eventTime" name="timeFrom" min="00:00" max="23:59"/>
</div>
<div className="w-[45%]">
<label className="text-secondary text-sm" htmlFor="TimeTo">To:</label>
<input className="border-2 bg-background text-secondary border-border p-1 rounded w-full" type="time" id="eventTime" name="timeTo" min="00:00" max="23:59"/>
</div>
</div>
</div>

<div className="flex flex-col mb-4">

<label className="font-medium text-secondary text-sm" htmlFor="maxparticipants"> <span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-red-500">
Nr. of Participants
</span></label>
<input
className="border-2 border-border bg-background text-secondary p-1 rounded w-full"
  id="MaxParticipants"
  type="number"
  name="maxParticipants"
  max={20}
    min={1}
    placeholder="Max. Participants.."
  aria-label="maxParticipants"
  autoComplete="off"
/>

</div>



<div className="flex justify-between mb-4 w-full">
<div className="w-[90%]">

<label htmlFor="housenr"><span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-red-500">
City
</span></label>
<input className="border-2 bg-background text-secondary border-border p-1 rounded w-[90%]"
  id="city"
  type="text"
  name="city"
  aria-label="city"
  placeholder="City..."
  autoComplete="off"
/>
</div>
<div className="w-[90%] flex justify-center flex-col">

<label htmlFor="housenr">
    <span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-red-500">
Street
</span></label>

<input className="border-2 bg-background text-secondary border-border p-1 rounded w-[90%]"
  id="street"
  type="text"
  name="street"
  aria-label="street"
  placeholder="street"
  autoComplete="off"
/>
  
</div>

<div className="w-[90%] flex justify-end flex-col">

<label className="text-secondary text-sm font-medium" htmlFor="housenr">Housenr.</label>

<input className="border-2 bg-background text-secondary border-border p-1 rounded w-[90%]"
  id="housenumber"
  type="text"
  name="housenumber"
  aria-label="housenumber"
  placeholder="housenumber..."
  autoComplete="off"
/>
  
</div>
</div>

<div className="w-full mb-4">
<label htmlFor="description">Description</label>
<textarea className="border-2 bg-background text-secondary border-border p-1 rounded w-full h-[100px] resize-none "
  id="description"
  type="text"
  name="description"
  aria-label="description"
    placeholder="Description of the event.."
/>
</div>


<div className="flex flex-col mb-4">

<label className="font-medium text-secondary text-sm" htmlFor="tags">Tags</label>
<input
className="border-2 border-border bg-background text-secondary p-1 rounded w-full"
  id="tags"
  type="text"
  name="tags"
  aria-label="tags"
  placeholder="fx. charity, run, walk..."
  autoComplete="off"
/>

</div>

<div className="flex flex-col">
              <label className='font-medium text-secondary text-sm' htmlFor="image">Image URL:</label>

              <input
                name="image"
                className="border-2 border-border bg-background text-secondary p-1 rounded w-full"
                type="url"
                placeholder="Paste an image URL..."
                onChange={(e) => setImage(e.target.value)}
              />
                <div className="mt-1">
              <label className="" htmlFor="image-preview">Image Preview</label>
              <img
                id="image-preview"
                className="rounded w-[350px] object-cover"
                src={
                    image
                      ? image
                      : "https://placehold.co/600x400?text=Paste+an+image+URL"
                  }
                alt="Choose"
                onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
              />
              </div>
            </div>

            <div>
<div className="bg-red-500 mt-3 rounded full text-center">
          {actionData?.errors && Object.keys(actionData.errors).length > 0 && (
            <p className="p-1 text-white">
              {Object.values(actionData.errors)[currentErrorIndex].message}
            </p>
          )}
        </div>
</div>

            
<div className="flex justify-between mt-2 w-full text-primary">
  <button className="bg-btnone p-2 rounded text-lg" type="submit">Create</button>
  <button className="bg-btntwo p-2 rounded text-lg" onClick={handleCancel}>Cancel</button>
</div>
</Form>
</div>
);
}


export async function action({ request }) {
    // Get the authenticated user
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin",
    });

    // Extract form data from the request
    const formData = await request.formData();

    // Extract individual form fields
    const {
        title,
        description,
        date,
        maxParticipants,
        city,
        street,
        housenumber,
        timeFrom,
        timeTo,
        tags,
        image // Ensure you have an 'image' field in your form
    } = Object.fromEntries(formData);

    // Create a new event object
    const newEvent = {
        title,
        timeFrom,
        tags: tags.toLowerCase().split(",").map((tag) => tag.trim()), // Split tags string into an array of tags and make them lowercase
        timeTo,
        description,
        date, // Convert date string to Date object
        maxParticipants,// Parse maxParticipants to integer
        address: {
            city,
            street,
            houseNumber: housenumber
        },
        image // Image URL
    };

    // Add the authenticated user's id to the event
    newEvent.created_by = user._id;
    newEvent.participants = [user._id];

    try {
        // Save the event to the database
        await mongoose.models.Event.create(newEvent);

        // Redirect to the appropriate page after event creation
        return redirect("/events");
    } catch (error)  {
        console.log(error);
        return json( { errors: error.errors, values: Object.fromEntries(formData) },
        { status: 400 },)
      }
}

  