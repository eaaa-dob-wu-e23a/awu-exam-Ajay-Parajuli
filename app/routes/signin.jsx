import { Form, NavLink } from "@remix-run/react";
import { useState } from "react";

export default function SignIn() {

  return (
    <div className="flex flex-col justify-center items-center w-full xl:h-[100vh]">
            <h1 className="mt-2 font-bold text-3xl">GetFit</h1>
      <Form className="flex flex-col shadow-2xl p-4 rounded-xl w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[40%] 2xl:w-[30%]" id="sign-up-form" method="post">
        <h2 className="border-gray-300 mb-4 pb-3 border-b-2 font-medium text-xl">Sign In</h2>

        <div className="flex flex-col mb-4">
        <label htmlFor="mail"> <span className="block after:content-['*'] after:ml-0.5 font-medium text-slate-700 text-sm after:text-red-500">
    Email
  </span></label>
        <input className="border-2 border-gray-300 p-1 rounded w-full"
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
        <label htmlFor="password"><span className="block after:content-['*'] after:ml-0.5 font-medium text-slate-700 text-sm after:text-red-500">
    Password
  </span></label>


        <input
        className="border-2 border-gray-300 p-1 rounded w-full"
          id="password"
          type="password"
          name="password"
          aria-label="password"
          placeholder="Type your password..."
        />
        </div>

        <div className="mt-2 w-full text-white">
          <button className="bg-black p-2 rounded w-full text-lg" type="submit">Sign Up</button>
        </div>
        <div className="mt-5 text-center">
      <p>
        Do not have an account? Sign up <NavLink className="text-blue-700 underline" to="/signup">here.</NavLink>
      </p>
      </div>
      </Form>
    </div>
  );
}
