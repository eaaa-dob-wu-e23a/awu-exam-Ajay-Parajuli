import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import mongoose from "mongoose";
import { useState } from "react";
import { authenticator } from "../services/auth.server";

export function meta() {
  return [
    {
      title: "Getfitapp - Update",
    },
  ];
}


export default function UpdateEvent() {

}