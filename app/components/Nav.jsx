import { NavLink } from "@remix-run/react";

export default function Nav() {
  return (
    <nav className="flex justify-around items-center bg-black hover:shadow-lg w-full h-[80px] font-med font-medium text-white">
    <NavLink className="flex justify-center items-center hover:bg-white m-auto w-full h-full hover:text-black cursor-pointer" to="/posts">Events</NavLink>
    <NavLink className="flex justify-center items-center hover:bg-white m-auto w-full h-full hover:text-black cursor-pointer" to="/create-event">Create Event</NavLink>
    <NavLink className="flex justify-center items-center hover:bg-white m-auto w-full h-full hover:text-black cursor-pointer" to="/your-events">Your Events</NavLink>
    <NavLink className="flex justify-center items-center hover:bg-white m-auto w-full h-full hover:text-black cursor-pointer" to="/profile">Profile</NavLink>
  </nav>
  );
}
