import { authenticator } from "../services/auth.server";
import mongoose from "mongoose";
import { json } from "@remix-run/node";


export const meta = () => {
    return [{ title: "GetFit app" }];
  };

  export async function loader({ request, params }) {
    // Ensure the user is authenticated
    const authUser = await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin",
    });
    // Load the post and the user who created it
    const post = await mongoose.models.Post.findById(params.postId).populate("user");
    return json({ post, authUser });
  }


export default function Event() {
    return(
        <div>
            nore
        </div>
    );
}