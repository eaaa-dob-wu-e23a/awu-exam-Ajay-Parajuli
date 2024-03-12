import { redirect } from "@remix-run/node";
import mongoose from "mongoose";
import { authenticator } from "../services/auth.server";

export async function action({ params, request }) {
  const authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });

  const deleteEvent = await mongoose.models.Event.findById(params.eventId);

  console.log(deleteEvent.created_by.toString());

  if (deleteEvent.created_by.toString() !== authUser._id.toString()) {
    // User is not the creator of the event, redirect
    return redirect(`/events/${params.eventId}`);
  } else {
    await mongoose.models.Event.findByIdAndDelete(params.eventId);
  }
  return redirect("/events");
}
