import { authenticator } from "../services/auth.server";

export const meta = () => {
  return [{ title: "GetFit App" }];
};

export async function loader({ request }) {
  // return redirect("/events");
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/events",
    failureRedirect: "/signin",
  });
}
