"use client";

import LoginForm from "@/components/Login/login-form";
import { InstagramIcon } from "@/icons";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaFacebook } from "react-icons/fa";

// export const metadata: Metadata = {
//   title: "Login - Outstagram",
// };

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-xs">
        <div className="mb-8 flex flex-col justify-center items-center">
          <InstagramIcon />
          <h1 className="text-3xl font-bold">Outstagram</h1>
        </div>
        <LoginForm />
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
        <div className="mb-4 flex items-center justify-center">
          <Link href="/oauth-facebook">
            <Button className="flex items-center" variant="ghost">
              <FaFacebook className="mr-2 h-4 w-4" />
              Log in with Facebook
            </Button>
          </Link>
        </div>
        <div className="text-center">
          <Link className="text-sm" href="#">
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <span className="text-sm text-gray-500">Don&apos;t have an account?</span>
        <Link className="text-sm font-semibold" href="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
