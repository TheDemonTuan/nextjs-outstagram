"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserResponse } from "@/api/user";
import UserAvatar from "./user-avatar";
import {
  EditProfileFormValidate,
  EditProfileFormValidateSchema,
} from "./profile-form.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, DatePicker, DateValue } from "@nextui-org/react";

const ProfileForm = ({ profile }: { profile: UserResponse }) => {
  const [avatar, setAvatar] = useState(profile.avatar || "");

  const form = useForm<EditProfileFormValidate>({
    resolver: zodResolver(EditProfileFormValidateSchema),
    defaultValues: {
      email: profile.email || "",
      full_name: profile.full_name || "",
      username: profile.username || "",
      bio: profile.bio || "",
      phone: profile.phone || "",
      gender: profile.gender || false,
      avatar: profile.avatar || "",
      birthday: profile.birthday || new Date(),
    },
  });

  const { isDirty, isSubmitting, isValid } = form.formState;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        form.setValue("avatar", reader.result as string); // Update form value with the new avatar
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 py-10  max-w-xl">
      <div className="flex items-center gap-x-2 md:gap-x-5 justify-between rounded-2xl p-3 bg-[#EFEFEF]">
        <div className="flex items-center gap-x-4">
          <div>
            <Avatar className="w-14 h-14 cursor-pointer" src={avatar} />
          </div>
          <div>
            <p className="font-medium">{profile.username}</p>
            <p>{profile.full_name}</p>
          </div>
        </div>

        <div className="bg-[#0090ED] rounded-md hover:bg-[#1877F2] pt-1 pb-1 pl-3 pr-3">
          <label
            htmlFor="file-upload"
            className="text-white text-sm font-bold cursor-pointer "
          >
            Change photo
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            // const { message } = await updateProfile(values);
            // toast(message);
          })}
          className="space-y-8"
        >
          <FormItem>
            <div className=" md:items-center gap-y-2 gap-x-8">
              <FormLabel className="font-bold w-20 md:text-right">
                Website
              </FormLabel>
              <FormControl aria-disabled className="mt-2">
                <Input
                  placeholder="Website"
                  disabled
                  className="bg-[#EFEFEF] border-1 "
                />
              </FormControl>
            </div>
            <FormDescription className="text-xs">
              Editing your links is only available on mobile. Visit the
              Instagram app and edit your profile to change the websites in your
              bio.
            </FormDescription>
            <FormMessage className="md:ml-24" />
          </FormItem>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className=" md:items-center gap-y-2 gap-x-8">
                  <FormLabel className="font-bold w-20 md:text-right">
                    Username
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input {...field} />
                  </FormControl>
                </div>

                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <div className="md:items-center gap-y-2 gap-x-8">
                  <FormLabel className="font-bold w-20 md:text-right">
                    Name
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input {...field} />
                  </FormControl>
                </div>

                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <div className=" md:items-center gap-y-2 gap-x-8">
                  <FormLabel className="font-bold w-20 md:text-right">
                    Bio
                  </FormLabel>
                  <FormControl className="mt-2">
                    <div className="relative w-full">
                      <Textarea className="resize-none" {...field} />
                      <FormDescription className="absolute bottom-2 right-2 text-xs">
                        {field.value?.length} / 150
                      </FormDescription>
                    </div>
                  </FormControl>
                </div>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <div className=" md:items-center gap-y-2 gap-x-8">
                  <FormLabel className="font-bold w-20 md:text-right">
                    Gender
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value == true ? "true" : "false"}
                  >
                    <FormControl className="mt-2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Female</SelectItem>
                      <SelectItem value="false">Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormDescription className="text-xs">
                  This wont be part of your public profile.
                </FormDescription>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col md:flex-row md:items-center gap-y-2 gap-x-8">
                  <FormLabel className="font-bold w-20 md:text-right">
                    Birthday
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="yyyy-MM-dd"
                      maxDate={new Date()}
                      showYearDropdown
                      showMonthDropdown
                    />
                  </FormControl>
                </div>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          /> */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
              className="pl-20 pr-20 pt-5 pb-5"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
