import { Form } from "@remix-run/react";
import { useState } from "react";

export default function SignUp() {

  return (
    <div className="flex justify-center items-center w-full">
      <Form className="flex flex-col bg-white shadow-md p-4 rounded-xl w-full" id="sign-up-form" method="post">
        <h1 className="mb-4 pb-3 border-b-2 border-black font-bold text-xl">Sign Up</h1>
        <div className="flex mb-4 w-full">
      <div className="w-full">
        <label htmlFor="firstname">Firstname</label>
        <input className="border-2 border-gray-700 p-1 rounded w-[95%]"
          id="firstname"
          type="text"
          name="firstname"
          aria-label="firstname"
          placeholder="Type your firstname..."
          autoComplete="off"
        />
        </div>
        <div className="w-full">
        <label htmlFor="lastname">Lastname</label>
       
        <input className="border-2 border-gray-700 p-1 rounded w-[95%]"
          id="lastname"
          type="text"
          name="lastname"
          aria-label="lastname"
          placeholder="Type your lastname..."
          autoComplete="off"
        />
        </div>
        </div>

        <div className="flex flex-col mb-4">
        <label htmlFor="mail">Mail</label>
        <input className="border-2 border-gray-700 p-1 rounded w-full"
          id="mail"
          type="email"
          name="mail"
          aria-label="mail"
          placeholder="Type your mail..."
          required
          autoComplete="off"
        />
          </div>
        <div className="flex flex-col mb-4">
        <label htmlFor="password">Password</label>


        <input
        className="border-2 border-gray-700 p-1 rounded w-full"
          id="password"
          type="password"
          name="password"
          aria-label="password"
          placeholder="Type your password..."
        />
        </div>

<div className="flex flex-col mb-4">
        <label htmlFor="address">Address</label>
        <input
        className="border-2 border-gray-700 p-1 rounded w-full"
          id="address"
          type="text"
          name="address"
          aria-label="address"
          placeholder="City, Country..."
          autoComplete="off"
        />

        </div>

        <div className="flex flex-col mb-4">

        <label htmlFor="languages">Languages</label>
        <input
        className="border-2 border-gray-700 p-1 rounded w-full"
          id="languages"
          type="text"
          name="languages"
          aria-label="languages"
          placeholder="Type the languages you speak..."
          autoComplete="off"
        />

</div>

        <fieldset className="flex justify-around mb-4">
          <legend>Gender:</legend>
          <input type="radio" id="male" name="gender" value="Male" />
          <label htmlFor="male">Male</label>
          <br />
          <input type="radio" id="female" name="gender" value="Female" />
          <label htmlFor="female">Female</label>
          <br />
          <input type="radio" id="other" name="gender" value="Other" />
          <label htmlFor="other">Other</label>
        </fieldset>
        <div className="mt-2 w-full text-white">
          <button className="bg-[#333] p-2 rounded w-full text-lg" type="submit">Sign Up</button>
        </div>
      </Form>
    </div>
  );
}
