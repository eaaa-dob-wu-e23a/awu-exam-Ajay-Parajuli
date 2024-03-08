import { redirect } from "@remix-run/node";
import mongoose from "mongoose";
import { authenticator } from "../services/auth.server";

export async function action({ params, request }) {
  const authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });

  const user = await mongoose.models.User.findById(authUser._id);
  const event = await mongoose.models.Event.findById(params.eventId);

  const participantIndex = event.participants.indexOf(user._id);
  if (participantIndex !== -1) {
    event.participants.splice(participantIndex, 1); // Remove the user from the participants array
    event.maxParticipants += 1; // Increase the maxParticipants count
  } else {
    // Add the user to the participants array
    event.participants.push(user._id);
    event.maxParticipants -= 1; // Decrease the maxParticipants count
  }

  await event.save();
  
  return redirect(`/events/${params.eventId}`);
}
