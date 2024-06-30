import OAuth from "@/components/OAuth";
import RegisterForm from "@/components/Register/register-form";
import { InstagramIcon } from "@/icons";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Register - Outstagram",
};

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-xs">
        <div className="mb-8 flex flex-col justify-center items-center">
          <InstagramIcon />
          <h1 className="text-3xl font-bold">Outstagram</h1>
        </div>
        <RegisterForm />
        <div className="mb-4 flex items-center justify-between">
          <div
            className="flex-grow-0 h-px bg-gray-300"
            style={{
              flexBasis: "40%",
            }}
          />
          <div className="mx-4 text-sm text-gray-500">OR</div>
          <div
            className="flex-grow-0 h-px bg-gray-300"
            style={{
              flexBasis: "40%",
            }}
          />
        </div>
        <OAuth />
        <div className="text-center">
          <Link className="text-sm" href="#">
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <span className="text-sm text-gray-500">Have an account?</span>
        <Link className="text-sm font-semibold" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
