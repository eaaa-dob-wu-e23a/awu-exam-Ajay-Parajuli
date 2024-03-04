import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";

export async function loader() {
  const entries = await mongoose.models.User.find({});
  return json({ entries });
}

export default function Index() {
  const { entries } = useLoaderData(); 

  return (
    <div className="bg-slate-900 p-8 text-slate-50">
      <code>
        <pre className="animate-pulse">{JSON.stringify(entries, null, 2)}</pre>
      </code>
    </div>
  );
}
