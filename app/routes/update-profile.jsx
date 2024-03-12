import {  redirect, json } from '@remix-run/node';
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { useState } from "react";
import mongoose from "mongoose";
import { authenticator } from "../services/auth.server";
import { useNavigate } from "@remix-run/react";

export async function loader({ request }) {
    const user = await authenticator.isAuthenticated(request, {
      // Check if the user is authenticated and get the user data
      failureRedirect: "/signin",
    });
    // check if the users data is updated in the database
      const updatedUser = await mongoose.models.User.findById(user._id);
      return { user: updatedUser };
  }
  


export default function UpdateProfile() {
    const [currentErrorIndex, setCurrentErrorIndex] = useState(0); // State to track the current error index
    const actionData = useActionData();
    const { user } = useLoaderData();
    const [image, setImage] = useState(user.image);
    const navigate = useNavigate(); 

    function handleCancel() {
        navigate(-1);
      }
return (
    <div className="flex flex-col justify-center items-center w-full md:h-[95vh] xl:h-[90vh] ">
<Form className="flex flex-col shadow-2xl p-4 rounded-xl w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%] border-b-2 border-border border-l-2" id="sign-up-form" method="post">
<h2 className="border-border mb-4 pb-3 border-b-2 font-medium text-secondary text-xl">Update Profile</h2>
<div>
<div className="bg-btntwo mb-3 rounded w-full text-center">
          {actionData?.errors && Object.keys(actionData.errors).length > 0 && (
            <p className="p-1 text-primary">
              {Object.values(actionData.errors)[currentErrorIndex].message}
            </p>
          )}
        </div>
</div>
<div className="flex justify-between mb-4 w-full">
<div className="w-[100%]">
<label htmlFor="firstname"><span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-btntwo">
Firstname
</span></label>
<input className="border-2 bg-background text-secondary border-border p-1 rounded w-[97%]"
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

<label className="bg-black w-full" htmlFor="lastname"><span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-btntwo">
Lastname
</span>

<input className="border-2 bg-background text-secondary border-border p-1 rounded w-full"
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
<label className="font-medium text-secondary text-sm" htmlFor="address">Age</label>
<input
className="border-2 border-border bg-background text-secondary p-1 rounded w-full"
  id="age"
  type="number"
  name="age"
  aria-label="age"
    defaultValue={user.age}
  placeholder="City, Country..."
  autoComplete="off"
/>

</div>

<div className="flex flex-col mb-4">

<label className="font-medium text-secondary text-sm" htmlFor="languages">Languages</label>
<input
className="border-2 border-border bg-background text-secondary p-1 rounded w-full"
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
  <legend className="font-medium text-secondary text-sm">Gender:</legend>
  <input className="mr-2 bg-background text-secondary" type="radio" defaultChecked={user.gender === "Male"} id="male" name="gender" value="Male" />
  <label className="mr-4 text-secondary" htmlFor="male">Male</label>
  <br />
  <input className="mr-2 bg-background text-secondary" type="radio" id="female" name="gender" defaultChecked={user.gender === "Female"} value="Female" />
  <label className="mr-4 text-secondary" htmlFor="female">Female</label>
  <br />
  <input className="mr-2 bg-background text-secondary" type="radio" id="other" name="gender" defaultChecked={user.gender === "Other"} value="Other" />
  <label className="mr-4 text-secondary" htmlFor="other">Other</label>
</fieldset>
<div className="flex flex-col">
              <label className='font-medium text-secondary text-sm' htmlFor="image">Image URL:</label>

              <input
                name="image"
                className="border-2 bg-background text-secondary border-border p-1 rounded w-full"
                defaultValue={user.image}
                type="url"
                onChange={e => setImage(e.target.value)}
                placeholder="Paste an image URL..."
              />
                <div className="mt-1">
              <label className="" htmlFor="image-preview">Image Preview</label>
              <img
                id="image-preview"
                className="rounded w-[350px] h-[200px] object-cover"
                src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
                alt="Choose"
                onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
              />
              </div>
            </div>
<div className="flex justify-between mt-2 w-full text-white">
  <button className="bg-btnone p-2 rounded text-primary text-lg" type="submit">Update</button>
  <button className="bg-btntwo text-primary p-2 rounded text-lg" onClick={handleCancel}>Cancel</button>
</div>
</Form>
</div>
);
}


export async function action({ request }) {
    const formData = await request.formData();
    try {
      // Protect the route
      const authUser = await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin",
      });
  
      // Fetch the user to check if the current user is the creator
      const userToUpdate = await mongoose.models.User.findById(authUser._id);
  
      if (!userToUpdate) {
        // If userToUpdate is not found, handle the error appropriately
        throw new Error("User not found");
      }
  
      // Update the user document based on the form data
      const userData = Object.fromEntries(formData);
  
      // Update userToUpdate with the new data
      userToUpdate.firstname = userData.firstname;
      userToUpdate.lastname = userData.lastname;
      userToUpdate.languages = userData.languages.split(",").map(lang => lang.trim()); // Split by comma and remove extra spaces
      userToUpdate.image = userData.image;
      userToUpdate.address = userData.address;
      userToUpdate.gender = userData.gender;
  
      await userToUpdate.save();
  
      // Redirect to the profile page
      return redirect("/profile");
    } catch (error) {
        console.log(error);
        return json( { errors: error.errors, values: Object.fromEntries(formData) },
        { status: 400 },)
      }
    }
  