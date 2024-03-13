import { json, redirect } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigate,
  useActionData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import mongoose from "mongoose";
import { useState } from "react";
import { authenticator } from "../services/auth.server";
import { format } from "date-fns";
import ErrorMessage from "~/components/ErrorMessage";

export function meta() {
  return [
    {
      title: "Getfitapp - Update",
    },
  ];
}

export async function loader({ request, params }) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });

  try {
    // Get the event data from the database
    const event = await mongoose.models.Event.findById(params.eventId);

    if (!event) {
      throw new Error("Event not found with given Id");
    }

    return json({ event });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw new Error("Invalid event Id");
    } else {
      throw new Error("An error occurred while fetching the event");
    }
  }
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorMessage
        title={error.status + " " + error.statusText}
        message={error.data}
      />
    );
  } else if (error instanceof Error) {
    return <ErrorMessage title={error.message} />;
  } else {
    return <ErrorMessage title="Unknown Error" />;
  }
}

export default function UpdateEvent() {
  const actionData = useActionData();
  const { event } = useLoaderData();
  const [image, setImage] = useState(event.image);
  const navigate = useNavigate();
  const [currentErrorIndex, setCurrentErrorIndex] = useState(0); // State to track the current error index

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div className=" flex flex-col justify-center md:mt-5 items-center w-full xl:h-[90vh]">
      <Form
        className="flex flex-col shadow-2xl p-4 rounded-xl w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%] xl:h-[80vh]  xl:mt-[10px] xl:overflow-y-auto border-b-2 border-border border-l-2"
        id="sign-up-form"
        method="post"
      >
        <h2 className="border-border mb-4 pb-3 border-b-2 font-medium text-xl text-secondary">
          Update Event
        </h2>

        <div className="flex flex-col mb-4">
          <label className="font-medium text-secondary text-sm" htmlFor="title">
            <span className="block after:content-['*'] after:ml-0.5 font-medium text-s text-sm after:text-btntwo">
              Title
            </span>
          </label>
          <input
            className="border-2 border-border p-1 rounded w-full bg-background text-secondary"
            id="title"
            type="text"
            name="title"
            aria-label="title"
            defaultValue={event.title}
            placeholder=""
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label
            className="font-medium text-s text-sm text-secondary"
            htmlFor="Date"
          >
            {" "}
            <span className="block after:content-['*'] after:ml-0.5 font-medium text-s text-sm after:text-btntwo">
              Date
            </span>
          </label>
          <input
            className="border-2 border-border p-1 rounded w-full bg-background text-secondary"
            id="date"
            type="date"
            name="date"
            defaultValue={format(new Date(event.date), "yyyy-MM-dd")}
            aria-label="date"
            placeholder="fx. english, french, spanish..."
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label
            className="font-medium text-s text-sm text-secondary"
            htmlFor="Time"
          >
            {" "}
            <span className="block after:content-['*'] after:ml-0.5 font-medium text-s text-sm after:text-btntwo">
              Time
            </span>
          </label>
          <div className="flex justify-between">
            <div className="w-[45%]">
              <label className="text-secondary text-sm" htmlFor="TimeFrom">
                From:
              </label>
              <input
                className="border-2 border-border p-1 rounded w-full bg-background text-secondary"
                type="time"
                id="eventTime"
                name="timeFrom"
                min="00:00"
                max="23:59"
                defaultValue={event.timeFrom}
              />
            </div>
            <div className="w-[45%]">
              <label className="text-secondary text-sm" htmlFor="TimeTo">
                To:
              </label>
              <input
                className="border-2 border-border p-1 rounded bg-background text-secondary w-full"
                type="time"
                id="eventTime"
                name="timeTo"
                min="00:00"
                max="23:59"
                defaultValue={event.timeTo}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label
            className="font-medium text-s text-sm text-secondary"
            htmlFor="maxparticipants"
          >
            {" "}
            <span className="block after:content-['*'] after:ml-0.5 font-medium text-s text-sm after:text-btntwo">
              Nr. of Participants
            </span>
          </label>
          <input
            className="border-2 border-border p-1 rounded w-full bg-background text-secondary"
            id="MaxParticipants"
            type="number"
            name="maxParticipants"
            max={26}
            min={2}
            defaultValue={event.maxParticipants}
            aria-label="maxParticipants"
            autoComplete="off"
          />
        </div>

        <div className="flex justify-between mb-4 w-full">
          <div className="w-[90%]">
            <label htmlFor="housenr">
              <span className="block after:content-['*'] after:ml-0.5 font-medium text-s text-sm text-secondary after:text-btntwo">
                City
              </span>
            </label>
            <input
              className="border-2 border-border p-1 rounded bg-background text-secondary w-[90%]"
              id="city"
              type="text"
              name="city"
              aria-label="city"
              defaultValue={event.address.city}
              placeholder="City..."
              autoComplete="off"
            />
          </div>
          <div className="w-[90%] flex justify-center flex-col">
            <label htmlFor="housenr">
              <span className="block after:content-['*'] text-secondary after:ml-0.5 font-medium text-s text-sm after:text-btntwo">
                Street
              </span>
            </label>

            <input
              className="border-2 border-border p-1 rounded w-[90%] bg-background text-secondary"
              id="street"
              type="text"
              name="street"
              aria-label="street"
              defaultValue={event.address.street}
              placeholder="street"
              autoComplete="off"
            />
          </div>

          <div className="w-[90%] flex justify-end flex-col">
            <label
              className="text-s text-sm text-secondary font-medium"
              htmlFor="housenr"
            >
              Housenr.
            </label>

            <input
              className="border-2 border-border p-1 rounded bg-background text-secondary w-[90%]"
              id="housenumber"
              type="text"
              name="housenumber"
              aria-label="housenumber"
              defaultValue={event.address.houseNumber}
              placeholder="housenumber..."
              autoComplete="off"
            />
          </div>
        </div>

        <div className="w-full mb-4">
          <label className="text-secondary" htmlFor="description">
            Description
          </label>
          <textarea
            className="border-2 bg-background text-secondary border-border p-1 rounded w-full h-[100px] resize-none "
            id="description"
            type="text"
            name="description"
            aria-label="description"
            defaultValue={event.description}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="font-medium text-secondary text-sm" htmlFor="tags">
            Tags
          </label>
          <input
            className="border-2 border-border p-1 rounded w-full bg-background text-secondary"
            id="tags"
            type="text"
            name="tags"
            aria-label="tags"
            defaultValue={event.tags}
            placeholder="fx. charity, run, walk..."
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-secondary text-sm" htmlFor="image">
            Image URL:
          </label>

          <input
            name="image"
            className="border-2 border-border bg-background text-secondary p-1 rounded w-full"
            defaultValue={event.image}
            type="url"
            onChange={(e) => setImage(e.target.value)}
            placeholder="Paste an image URL..."
          />
          <div className="mt-1">
            <label className="" htmlFor="image-preview">
              Image Preview
            </label>
            <img
              id="image-preview"
              className="rounded w-[350px] object-cover"
              src={
                image
                  ? image
                  : "https://placehold.co/600x400?text=Paste+an+image+URL"
              }
              alt="Choose"
              onError={(e) =>
                (e.target.src =
                  "https://placehold.co/600x400?text=Error+loading+image")
              }
            />
          </div>
        </div>

        <div>
          <div className="bg-red-500 mt-3 rounded w-full text-center">
            {actionData?.errors &&
              Object.keys(actionData.errors).length > 0 && (
                <p className="p-1 text-white">
                  {Object.values(actionData.errors)[currentErrorIndex].message}
                </p>
              )}
          </div>
        </div>

        <div className="flex justify-between mt-2 w-full text-white">
          <button
            className="bg-btnone p-2 rounded text-lg text-primary"
            type="submit"
          >
            Update
          </button>
          <button
            className="bg-btntwo text-primary p-2 rounded text-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  try {
    // Protect the route
    const authUser = await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin",
    });

    // Fetch the post to check if the current user is the creator
    const eventToUpdate = await mongoose.models.Event.findById(params.eventId);

    if (eventToUpdate.created_by.toString() !== authUser._id.toString()) {
      // User is not the creator of the event, redirect
      return redirect(`/events/${params.eventId}`);
    }

    // User is authenticated and is the creator, proceed to update the post

    const event = Object.fromEntries(formData); //

    // Since postToUpdate is already the document you want to update,
    // you can directly modify and save it, which can be more efficient than findByIdAndUpdate
    eventToUpdate.title = event.title;
    eventToUpdate.timeFrom = event.timeFrom;
    eventToUpdate.timeTo = event.timeTo;
    eventToUpdate.tags = event.tags.split(",").map((lang) => lang.trim()); // Split by comma and remove extra spaces
    eventToUpdate.image = event.image;
    eventToUpdate.date = event.date;
    eventToUpdate.maxParticipants = event.maxParticipants;
    eventToUpdate.address.city = event.city;
    eventToUpdate.address.street = event.street;
    eventToUpdate.address.houseNumber = event.housenumber;
    eventToUpdate.description = event.description;

    await eventToUpdate.save();

    return redirect(`/events/${params.eventId}`);
  } catch (error) {
    console.log(error);
    return json(
      { errors: error.errors, values: Object.fromEntries(formData) },
      { status: 400 },
    );
  }
}
