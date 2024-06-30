"use client";
import React, { useState } from "react";
import Link from "next/link";
import { InstagramFakeIcon } from "@/icons";
import { DatePicker, Input } from "@nextui-org/react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OauthFormValidate, OauthFormValidateSchema } from "./oauth-form.validate";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FormControl, FormField, FormItem } from "../ui/form";

const OauthForm = () => {
  const oauthForm = useForm<OauthFormValidate>({
    resolver: zodResolver(OauthFormValidateSchema),
    defaultValues: {
      email: "",
      full_name: "",
      username: "",
      password: "",
      birthday: new Date(),
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: OauthFormValidate) => {};

  return (
    <div className="bg-white flex flex-col p-5 rounded-xl w-2/5 shadow-md">
      <Form {...oauthForm}>
        <form>
          <Input
            variant="bordered"
            type="Email"
            label="Email address"
            disabled
            className="my-2 border-gray-100"
            radius="sm"
          />
          <div className="flex space-x-2">
            <Input type="text" variant="bordered" label="Username" autoFocus className="flex-1 my-2 " radius="sm" />
            <Input type="text" variant="bordered" label="Full name" className="flex-1 my-2" radius="sm" />
          </div>

          <DatePicker label={"Birth date"} variant="bordered" className="my-2" radius="sm" />
          <Input
            className="my-2 mt-4 "
            type={isVisible ? "text" : "password"}
            label="Password"
            radius="sm"
            variant="bordered"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEye className="text-xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <button className="bg-blue-600 my-2 py-2  w-full text-lg font-bold  text-white rounded-md hover:bg-blue-700">
            Log in
          </button>
          <div className="space-y-4 my-2 flex flex-col items-center justify-center">
            <Link
              href={`https://www.facebook.com/login/identify/`}
              className="cursor-pointer text-blue-600 text-sm text-center hover:underline">
              Forgotten password?
            </Link>
            <Link href={`/login`} className="flex items-center space-x-2 cursor-pointer">
              <InstagramFakeIcon />
              <p className="text-[#E1306C] text-sm font-medium">Login with Outstagram</p>
            </Link>
          </div>

          <span className="my-2">
            <hr />
          </span>

          <button className="flex items-center justify-center bg-green-500 my-2 py-2 px-2 text-1g font-bold text-white rounded-md hover:bg-green-600 w-fit mx-auto">
            Create new account
          </button>
        </form>
      </Form>
    </div>
  );
};

export default OauthForm;
