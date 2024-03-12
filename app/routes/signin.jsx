import { Form, NavLink, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { json, redirect } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { sessionStorage } from "../services/session.server";


export async function loader({ request }) {
  // If the user is already authenticated redirect to /posts directly
  await authenticator.isAuthenticated(request, {
    successRedirect: "/posts",
  });
  // Retrieve error message from session if present
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  // Get the error message from the session
  const error = session.get("sessionErrorKey");
  // Remove the error message from the session after it's been retrieved
  session.unset("sessionErrorKey");
  // Commit the updated session that no longer contains the error message
  const headers = new Headers({
    "Set-Cookie": await sessionStorage.commitSession(session),
  });

  return json({ error }, { headers }); // return the error message
}



export default function SignIn() {
  const loaderData = useLoaderData();
  console.log(loaderData);
  const [currentErrorIndex, setCurrentErrorIndex] = useState(0); 

  return (
    <div className="flex flex-col justify-center items-center w-full xl:h-[100vh]">
            <h1 className="mt-2 p-2 font-bold text-3xl text-secondary">GetFit</h1>
      <Form noValidate className="flex flex-col shadow-2xl p-4 rounded-xl w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[40%] 2xl:w-[30%] border-border border-2" id="sign-up-form" method="post">
        <h2 className="border-border text-secondary mb-4 pb-3 border-b-2 font-medium text-xl">Sign In</h2>
        <div className="bg-btntwo  mb-3 rounded w-full text-center">
          
      
        {loaderData?.error ? ( // 
          <div className="text-white">
            <p>{loaderData?.error?.message}</p>
          </div>
        ) : null}
    
        </div>

        <div className="flex flex-col mb-4">
        <label htmlFor="mail"> <span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-btntwo">
    Email
  </span></label>
        <input className="border-2 border-border p-1 rounded w-full"
          id="mail"
          type="email"
          name="mail"
          aria-label="mail"
          placeholder="Type your mail..."
          autoComplete="off"
        />
          </div>
        <div className="flex flex-col mb-4">
        <label htmlFor="password"><span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-btntwo">
    Password
  </span></label>


        <input
        className="border-2 border-border p-1 rounded w-full"
          id="password"
          type="password"
          name="password"
          aria-label="password"
          placeholder="Type your password..."
        />
        </div>

        <div className="mt-2 w-full text-primary">
          <button className="bg-btnone p-2 rounded w-full text-lg" type="submit">Sign in</button>
        </div>
        <div className="mt-5 text-center">
      <p className="text-secondary">
        Do not have an account? Sign up <NavLink className="text-btnone underline" to="/signup">here.</NavLink>
      </p>
      </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/events",
    failureRedirect: "/signin",
  });
}
