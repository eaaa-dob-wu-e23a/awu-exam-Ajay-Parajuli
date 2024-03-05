import EventCard from "../components/EventCard";
import mongoose from "mongoose";
import {authenticator} from "../services/auth.server";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";


export const meta = () => {
    return [{ title: "GetFit app" }];
  };

  export async function loader({ request }) {

    await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin",
    });
  
    try {
      const posts = await mongoose.models.Event.find().populate("created_by").sort({ createdAt: -1 });
      console.log(posts);
      return json({ posts });
    } catch (error) {
      console.error(error);
      throw new Response("Internal Server Error", { status: 500 });
    }
  }
  


export default function Events() {
    const { posts } = useLoaderData();
    return (
        <div>
         <section className="grid">
        {posts.map(post => (
          <Link key={post._id} className="post-link" to={`${post._id}`}>
            <EventCard post={post} />
          </Link>
        ))}
      </section>
        </div>
    );
}