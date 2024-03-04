import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";

export async function loader() {
  const entries = await mongoose.models.User.find({});
  return json({ entries });
}

export default function Index() {


  return (
    <div className="">
    
    </div>
  );
}
