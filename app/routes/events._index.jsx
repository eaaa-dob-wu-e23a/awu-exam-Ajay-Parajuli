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
      const filterTag = url.searchParams.get("tag") || "";
      const sortBy = url.searchParams.get("sort-by") || "createdAt"; 
  
      const sortOption = {};
  
      if (sortBy === "lastupdated") {
        sortOption.updatedAt = -1; // Sort updatedAt in descending order
      } else if (sortBy === "mostparticipants") {
        sortOption.participants = -1; // Sort participants array length in ascending order
      } else {
        sortOption[sortBy] = -1; // Sort other fields in descending order
      }
  
      const query = { title: { $regex: q, $options: "i" } };
  
      if (filterTag) {
        query.tags = filterTag;
      }
  
      const events = await mongoose.models.Event.find(query)
        .populate("created_by")
        .sort(sortOption);
  
      const uniqueTags = await mongoose.models.Event.aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags" } },
        { $sort: { _id: 1 } },
        { $project: { tag: "$_id", _id: 0 } },
      ]);
  
      const tags = uniqueTags.map((tagDoc) => tagDoc.tag);
  
      return json({ events, q, tags, filterTag, sortBy });
    } catch (error) {
      console.error(error);
      throw new Response("Internal Server Error", { status: 500 });
    }
  }
  


export default function Events() {
    const { events, q, tags, sortBy, filterTag } = useLoaderData();
    const submit = useSubmit();

    function handleSearchFilterAndSort(event) {
      const isFirstSearch = q === null;
      submit(event.currentTarget, {
        replace: !isFirstSearch,
      });
    }


    return (
        <div className="relative">
          <h1 className="p-2 font-semibold text-3xl">GetFit Events</h1>
          <div className="mt-4 p-2 lg:p-4">
            <Form className="flex flex-row flex-wrap gap-6 w-full md:justify-center " onChange={handleSearchFilterAndSort}>
              <div className="flex flex-col">
          <label htmlFor="search">
          Search by event title
          </label>
          <input className="border p-2 w-[250px] rounded" defaultValue={q}  aria-label="Search by caption"  placeholder="Search" type="search" name="q" />
          </div>
          <div className="flex flex-col">
          <label>
          Filter by tag{" "}
          </label>
          <select className="border p-2 w-[250px]  rounded" name="tag">
          <option value="">select tag</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
                </option>
            ))}
          </select>
          </div>
<div className="flex flex-col">
           <label>
       

          Sort by{" "}
          </label>
          <select className="border p-2 w-[250px] rounded" name="sort-by" defaultValue={sortBy}>
            <option value="createdAt">newest</option>
            <option value="lastupdated">Recently Updated</option>
            <option value="mostparticipants">most participants</option>
          </select>
          </div>
      
          </Form> 
          </div>
         <section className="flex flex-row flex-wrap gap-6 mt-5 p-2 lg:p-4 w-full md:justify-center">
        
         {events.length > 0 ? (
  events.map((event) => (
    <Link key={event._id} className="" to={`${event._id}`}>
      <EventCard post={event} />
    </Link>
  ))
) : (
  <p>No events available with the given query.</p>
)}

      </section>
        </div>
    );
}