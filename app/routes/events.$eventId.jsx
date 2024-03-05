import { authenticator } from "../services/auth.server";
import mongoose from "mongoose";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";


export const meta = () => {
    return [{ title: "GetFit app" }];
  };

  export async function loader({ request, params }) {
    // Ensure the user is authenticated
    const authUser = await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin",
    });
    // Load the event and the user who created it
    const event = await mongoose.models.Event.findById(params.eventId).populate("created_by");

    const users = await mongoose.models.User.find({ _id: { $in: event.participants } });
    console.log(users);
  

    return json({ event, authUser, users});
  }


export default function Event() {
    const { event, authUser, users } = useLoaderData();
    return(
        <div className="text-black">
            {users.map((user) => (
                <div key={user._id}>
                    <p>{user.firstname}</p>
                </div>
            ))
            }
        </div>
    );
}