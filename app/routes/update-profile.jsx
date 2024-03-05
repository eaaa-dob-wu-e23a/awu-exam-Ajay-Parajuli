import {  redirect } from '@remix-run/node';
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import mongoose from "mongoose";
import { authenticator } from "../services/auth.server";
import { useNavigate } from "@remix-run/react";




export default function UpdateProfile() {
return (
    <div className="flex flex-col justify-center items-center w-full xl:h-[100vh]">
    <h1 className="mt-2 font-bold text-3xl">GetFit</h1>
<Form className="flex flex-col shadow-2xl p-4 rounded-xl w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[40%] 2xl:w-[30%]" id="sign-up-form" method="post">
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
  aria-label="languages"
  placeholder="fx. english, french, spanish..."
  autoComplete="off"
/>

</div>

<fieldset className="flex mb-4">
  <legend className="font-medium text-slate-700 text-sm">Gender:</legend>
  <input className="mr-2" type="radio" id="male" name="gender" value="Male" />
  <label className="mr-4" htmlFor="male">Male</label>
  <br />
  <input className="mr-2" type="radio" id="female" name="gender" value="Female" />
  <label className="mr-4" htmlFor="female">Female</label>
  <br />
  <input className="mr-2" type="radio" id="other" name="gender" value="Other" />
  <label className="mr-4" htmlFor="other">Other</label>
</fieldset>
<div className="mt-2 w-full text-white">
  <button className="bg-black p-2 rounded w-full text-lg" type="submit">Update</button>
</div>
</Form>
</div>
);
}