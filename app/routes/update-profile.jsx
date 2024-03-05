import {  redirect } from '@remix-run/node';
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import mongoose from "mongoose";
import { authenticator } from "../services/auth.server";
import { useNavigate } from "@remix-run/react";




export default function UpdateProfile() {
return (
    <div>Update Profile</div>
);
}