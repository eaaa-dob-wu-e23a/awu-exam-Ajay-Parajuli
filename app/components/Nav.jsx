import { NavLink } from "@remix-run/react";

export default function Nav() {
  return (
    <nav>
    <NavLink to="/posts">Events</NavLink>
    <NavLink to="/create-event">Create Event</NavLink>
    <NavLink to="/Your Events">Your Events</NavLink>
    <NavLink to="/profile">Profile</NavLink>
  </nav>
  );
}
