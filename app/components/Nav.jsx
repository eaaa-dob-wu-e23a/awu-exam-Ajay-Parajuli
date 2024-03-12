import { NavLink } from "@remix-run/react";

export default function Nav() {
  return (
    <nav className="relative p-4 flex justify-around items-center bg-border hover:shadow-lg h-16 font-medium text-secondary z-50">
      <NavLink className="hover:bg-btnone w-full flex justify-center hover:text-primary cursor-pointer px-4 py-2 hover:rounded" to="/events">
        Events
      </NavLink>
      <NavLink className="hover:bg-btnone w-full flex justify-center hover:text-primary cursor-pointer px-4 py-2 hover:rounded" to="/create-event">
        Create
      </NavLink>
      <NavLink className="hover:bg-btnone w-full flex justify-center hover:text-primary cursor-pointer px-4 py-2 hover:rounded" to="/profile">
        Profile
      </NavLink>
    </nav>
  );
}
