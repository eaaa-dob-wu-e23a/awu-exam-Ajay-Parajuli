import EventCard from "../components/EventCard";
import mongoose from "mongoose";
import {authenticator} from "../services/auth.server";
import { json } from "@remix-run/node";
import { useLoaderData, Link, Form, useSubmit } from "@remix-run/react";


export const meta = () => {
    return [{ title: "GetFit app" }];
  };

  export async function loader({ request }) {

    await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin",
    });

  
    try {

      const url = new URL(request.url);
      const q = url.searchParams.get("q") || "";

      let sortedEvents = {}; // Declare the sortedEvents variable
      
      if (q) {
        sortedEvents = {
          title: { $regex: q, $options: "i" },
        };
    }
    
    
      const events = await mongoose.models.Event.find(sortedEvents).populate("created_by").sort({ createdAt: -1 });
      return json({ events, q });
    } catch (error) {
      console.error(error);
      throw new Response("Internal Server Error", { status: 500 });
    }
  }
  


export default function Events() {
    const { events, q } = useLoaderData();


    const submit = useSubmit();

    function handleSearchFilterAndSort(event) {
      const isFirstSearch = q === null; // 
      submit(event.currentTarget, { //   
        replace: !isFirstSearch, // 
      });
    }
    return (
        <div className="relative">
          <h1 className="p-2 font-semibold text-3xl">GetFit Events</h1>
          <div className="mt-4 p-2 lg:p-4">
            <Form className="flex flex-row flex-wrap gap-6 w-full md:justify-center " onChange={handleSearchFilterAndSort}>
              <div className="flex flex-col">
          <label htmlFor="search">
          Search by event name
          </label>
          <input className="border p-2 w-[250px] rounded" defaultValue={q}  aria-label="Search by caption"  placeholder="Search" type="search" name="q" />
          </div>
          <div className="flex flex-col">
          <label>
          Filter by tag{" "}
          </label>
          <select className="border p-2 w-[250px]  rounded" name="tag">
            <option value="">select tag</option>
           
          </select>
          </div>
<div className="flex flex-col">
           <label>
       

          Sort by{" "}
          </label>
          <select className="border p-2 w-[250px] rounded" name="sort-by">
            <option value="createdAt">newest</option>
            <option value="">caption</option>
            <option value="likes">most likes</option>
          </select>
          </div>
      
          </Form> 
          </div>
         <section className="flex flex-row flex-wrap gap-6 mt-5 p-2 lg:p-4 w-full md:justify-center">
        
        {events.map(event => (
          <Link key={event._id} className="post-link" to={`${event._id}`}>
          <EventCard post={event} />
          </Link>
        ))}
      </section>
        </div>
    );
}