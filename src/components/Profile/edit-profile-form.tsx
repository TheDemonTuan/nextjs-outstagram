"use client";
import React, { useEffect, useState } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { UserResponse, userUpdateMe } from "@/api/user";
import {
  EditProfileFormValidate,
  EditProfileFormValidateSchema,
} from "./edit-profile-form.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { fileURLToPath } from "url";

async function urlToFile(
  url: string,
  filename: string,
  mimeType: string
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}

const ProfileForm = ({ profile }: { profile: UserResponse }) => {
  const [avatar, setAvatar] = useState(profile.avatar || "");

  const editForm = useForm<EditProfileFormValidate>({
    resolver: zodResolver(EditProfileFormValidateSchema),
    defaultValues: {
      full_name: profile.full_name || "",
      username: profile.username || "",
      bio: profile.bio || "",
      gender: profile.gender || false,
      avatar: profile.avatar || "",
      birthday: profile.birthday || new Date(),
    },
  });

  useEffect(() => {
    if (profile.birthday) {
      editForm.setValue("birthday", new Date(profile.birthday));
    }
  }, [profile.birthday, editForm]);

  const { isDirty, isSubmitting, isValid } = editForm.formState;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      editForm.setValue("avatar", file.name);
    }
  };

  const handleSubMit = async (values: EditProfileFormValidate) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("full_name", values.full_name);
      formData.append("bio", values.bio);
      formData.append("gender", values.gender.toString());
      formData.append("birthday", values.birthday.toISOString());

      const extension = values.avatar.split(".").pop()?.toLowerCase();
      const mimeType = extension === "png" ? "image/png" : "image/jpeg";

      if (values.avatar && typeof values.avatar === "string") {
        const file = await urlToFile(
          `/${values.avatar}`,
          values.avatar,
          mimeType
        );
        formData.append("avatar", file);
      }

      const response = await userUpdateMe(formData);
      console.log("Update user response:", response);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="space-y-8 py-10  max-w-xl">
      <Form {...editForm}>
        <form
          onSubmit={editForm.handleSubmit(async (values) => {
            try {
              await handleSubMit(values);
            } catch (error) {
              console.error(error);
            }
          })}
          className="space-y-8"
        >
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
              <FormField
                control={editForm.control}
                name="avatar"
                render={() => (
                  <FormItem>
                    <label
                      htmlFor="file-upload"
                      className="text-white text-sm font-bold cursor-pointer "
                    >
                      Change photo
                    </label>
                    <FormControl>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".webp,.png,.jpg"
                        onChange={(e) => {
                          handleAvatarChange(e);
                          // e.target.value = "";
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

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
            control={editForm.control}
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
            control={editForm.control}
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
            control={editForm.control}
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
            control={editForm.control}
            name="gender"
            render={() => (
              <FormItem>
                <div className=" md:items-center gap-y-2 gap-x-8">
                  <FormLabel className="font-bold w-20 md:text-right">
                    Gender
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const genderValue = value === "true";
                      editForm.setValue("gender", genderValue);
                    }}
                    defaultValue={profile.gender ? "true" : "false"}
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

          <FormField
            control={editForm.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-bold w-20">Birthday</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger>
                      <FormControl>
                        <Button
                          size="lg"
                          about="Chọn ngày sinh"
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left text-sm",
                            !field.value && "text-muted-foreground",
                            !!editForm.formState.errors.birthday &&
                              "border-danger text-danger"
                          )}
                        >
                          {field.value ? (
                            <span>{new Date(field.value).toDateString()}</span>
                          ) : (
                            <span>Chọn ngày sinh</span>
                          )}
                          <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        // disabled={(date) =>
                        //   date > new Date() || date < new Date("1900-01-01")
                        // }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              // disabled={!isDirty || !isValid || isSubmitting}
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
