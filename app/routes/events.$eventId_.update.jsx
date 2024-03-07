import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate, useActionData } from "@remix-run/react";
import mongoose from "mongoose";
import { useState } from "react";
import { authenticator } from "../services/auth.server";


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
    const event = await mongoose.models.Event.findById(params.eventId).populate("created_by");
    return json({ event });
  }


export default function UpdateEvent() {
    const actionData = useActionData();

return(
 <div></div>
);
}