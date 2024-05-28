"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { ChangePasswordFormValidate, ChangePasswordFormValidateSchema } from "./change-password-form.validate";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Link from "next/link";

const ChangePasswordForm = () => {
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = React.useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = React.useState(false);
  const [isReTypeNewPasswordVisible, setIsReTypeNewPasswordVisible] = React.useState(false);

  const toggleCurrentPasswordVisibility = () => setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
  const toggleNewPasswordVisibility = () => setIsNewPasswordVisible(!isNewPasswordVisible);
  const toggleReTypeNewPasswordVisibility = () => setIsReTypeNewPasswordVisible(!isReTypeNewPasswordVisible);

  const editForm = useForm<ChangePasswordFormValidate>({
    resolver: zodResolver(ChangePasswordFormValidateSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormValidate) => {};

  return (
    <div className="space-y-8 py-8">
      <Form {...editForm}>
        <form onSubmit={editForm.handleSubmit(onSubmit)} className="space-y-8">
          <FormItem>
            <FormDescription className="text-sm">
              Your password must be at least 8 characters and should include a combination of numbers, letters <br />{" "}
              and special characters (!$@%).
            </FormDescription>
            <FormMessage />
          </FormItem>

          <FormField
            control={editForm.control}
            name="currentPassword"
            render={() => (
              <FormItem>
                <div className="md:items-center gap-y-2 gap-x-8">
                  <FormControl className="mt-2">
                    <Input
                      label="Current password"
                      variant="bordered"
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleCurrentPasswordVisibility}>
                          {isCurrentPasswordVisible ? (
                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none mb-2" />
                          ) : (
                            <FaEye className="text-2xl text-default-400 pointer-events-none mb-2" />
                          )}
                        </button>
                      }
                      type={isCurrentPasswordVisible ? "text" : "password"}
                      className="max-w-3xl"
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={editForm.control}
            name="newPassword"
            render={() => (
              <FormItem>
                <div className="md:items-center gap-y-2 gap-x-8">
                  <FormControl className="mt-2">
                    <Input
                      label="New password"
                      variant="bordered"
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleNewPasswordVisibility}>
                          {isNewPasswordVisible ? (
                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none mb-2" />
                          ) : (
                            <FaEye className="text-2xl text-default-400 pointer-events-none mb-2" />
                          )}
                        </button>
                      }
                      type={isNewPasswordVisible ? "text" : "password"}
                      className="max-w-3xl"
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={editForm.control}
            name="reTypeNewPassword"
            render={() => (
              <FormItem>
                <div className="md:items-center gap-y-2 gap-x-8">
                  <FormControl className="mt-2">
                    <Input
                      label="Re-type new password"
                      variant="bordered"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleReTypeNewPasswordVisibility}>
                          {isReTypeNewPasswordVisible ? (
                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none mb-2" />
                          ) : (
                            <FaEye className="text-2xl text-default-400 pointer-events-none mb-2" />
                          )}
                        </button>
                      }
                      type={isReTypeNewPasswordVisible ? "text" : "password"}
                      className="max-w-3xl"
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Link href="">
              <div className="font-medium text-primary-500 hover:underline">Forgot your password?</div>
            </Link>

            <Button type="submit" color="primary" className="pl-16 pr-16 pt-5 pb-5">
              Change password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
