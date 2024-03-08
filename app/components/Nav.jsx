import { NavLink } from "@remix-run/react";

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 p-4 flex justify-around items-center bg-black hover:shadow-lg h-16 font-medium text-white z-50">
      <NavLink className="hover:bg-white w-full  flex justify-center hover:text-black cursor-pointer px-4 py-2" to="/events">
        Events
      </NavLink>
      <NavLink className="hover:bg-white w-full flex justify-center hover:text-black cursor-pointer px-4 py-2" to="/create-event">
        Create
      </NavLink>
      <NavLink className="hover:bg-white w-full flex justify-center hover:text-black cursor-pointer px-4 py-2" to="/profile">
        Profile
      </NavLink>
    </nav>
  );
}
