import EventCard from "../components/EventCard";
import mongoose from "mongoose";




export const meta = () => {
    return [{ title: "GetFit app" }];
  };


export async function loader() {
 

  }



export default function Events() {
    return (
        <div>
        <h1>Events</h1>
        </div>
    );
}