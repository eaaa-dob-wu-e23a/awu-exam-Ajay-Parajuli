import { Form, NavLink, useActionData } from "@remix-run/react";
import { useState } from "react";
import { json, redirect } from "@remix-run/node";
import mongoose from "mongoose";

export default function SignUp() {
  const actionData = useActionData();
  const [currentErrorIndex, setCurrentErrorIndex] = useState(0); // State to track the current error index

  console.log(actionData);

  return (
    <div className="flex flex-col justify-center items-center w-full xl:h-[100vh] ">
      <h1 className="mt-2 p-2 font-bold text-4xl text-secondary">GetFit</h1>
      <Form
        className="flex bg-background flex-col shadow-2xl p-4 rounded-xl w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[40%] 2xl:w-[35%] border-2 border-border"
        id="sign-up-form"
        method="post"
      >
        <h2 className="border-border text-secondary mb-4 pb-3 border-b-2 font-medium text-xl">
          Sign Up
        </h2>
        <div>
          <div className="bg-btntwo mb-3 rounded w-full text-center">
            {actionData?.errors &&
              Object.keys(actionData.errors).length > 0 && (
                <p className="p-1 text-primary">
                  {Object.values(actionData.errors)[currentErrorIndex].message}
                </p>
              )}
          </div>
        </div>
        <div className="flex justify-between mb-4 w-full">
          <div className="w-[100%]">
            <label htmlFor="firstname">
              <span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-btntwo">
                Firstname
              </span>
            </label>
            <input
              className="border-2 bg-background text-secondary border-border p-1 rounded w-[97%]"
              id="firstname"
              type="text"
              name="firstname"
              aria-label="firstname"
              placeholder="Type your firstname..."
              autoComplete="off"
            />
          </div>
          <div className="w-[100%]">
            <label className="bg-black w-full" htmlFor="lastname">
              <span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-btntwo">
                Lastname
              </span>

              <input
                className="border-2 bg-background text-secondary border-border p-1 rounded w-full"
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
          <label htmlFor="mail">
            {" "}
            <span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-btntwo">
              Email
            </span>
          </label>
          <input
            className="border-2 bg-background text-secondary border-border p-1 rounded w-full"
            id="mail"
            type="text"
            name="mail"
            aria-label="mail"
            placeholder="Type your mail..."
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="password">
            <span className="block after:content-['*'] after:ml-0.5 font-medium text-secondary text-sm after:text-btntwo">
              Password
            </span>
          </label>

          <input
            className="border-2 border-border bg-background text-secondary p-1 rounded w-full"
            id="password"
            type="password"
            name="password"
            aria-label="password"
            placeholder="Type your password..."
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="font-medium text-secondary text-sm" htmlFor="age">
            Age
          </label>
          <input
            className="border-2 border-border bg-background text-secondary p-1 rounded w-full"
            id="address"
            type="number"
            name="age"
            aria-label="age"
            placeholder="Your age"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label
            className="font-medium text-secondary text-sm"
            htmlFor="languages"
          >
            Languages
          </label>
          <input
            className="border-2 border-border bg-background text-secondary p-1 rounded w-full"
            id="languages"
            type="text"
            name="languages"
            aria-label="languages"
            placeholder="fx. english, french, spanish..."
            autoComplete="off"
          />
        </div>

        <fieldset className="flex mb-4">
          <legend className="font-medium text-secondary text-sm">
            Gender:
          </legend>
          <input
            className="mr-2 bg-background text-secondary"
            type="radio"
            id="male"
            name="gender"
            value="Male"
          />
          <label className="mr-4 text-secondary" htmlFor="male">
            Male
          </label>
          <br />
          <input
            className="mr-2 bg-background text-secondary"
            type="radio"
            id="female"
            name="gender"
            value="Female"
          />
          <label className="mr-4 text-secondary" htmlFor="female">
            Female
          </label>
          <br />
          <input
            className="mr-2 bg-background text-secondary"
            type="radio"
            id="other"
            name="gender"
            value="Other"
          />
          <label className="mr-4 text-secondary" htmlFor="other">
            Other
          </label>
        </fieldset>
        <div className="mt-2 w-full text-primary">
          <button
            className="bg-btnone p-2 rounded w-full text-lg"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="mt-5 text-center">
          <p className="text-secondary">
            Already have an account? Sign in{" "}
            <NavLink className="text-btnone underline" to="/signin">
              here.
            </NavLink>
          </p>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  try {
    const newUser = Object.fromEntries(formData);
    const languages = newUser.languages.split(",").map((lang) => lang.trim()); // extract and process languages
    newUser.languages = languages; // update languages in newUser object
    await mongoose.models.User.create(newUser);

    return redirect("/signin");
  } catch (error) {
    console.log(error);
    return json(
      { errors: error.errors, values: Object.fromEntries(formData) },
      { status: 400 },
    );
  }
}
