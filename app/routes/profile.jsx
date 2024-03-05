import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "../services/auth.server";

import mongoose from "mongoose";
import { redirect } from "@remix-run/node";


export const meta = () => {
    return [{ title: "GetFit app" }];
    
}

export async function loader({ request }) {
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin"
    });
    const updatedUser = await mongoose.models.User.findById(user._id);
    return { user: updatedUser };
  }




export default function Profile() {

  return (
    <div>
<h2>sdsd</h2>
    </div>
  );
}

