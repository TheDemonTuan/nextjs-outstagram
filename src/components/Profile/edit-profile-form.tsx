"use client";

import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { UserEditProfileParams, UserResponse, userChangeAvatar, userEditProfile } from "@/api/user";
import { EditProfileFormValidate, EditProfileFormValidateSchema } from "./edit-profile-form.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Input, Popover, PopoverContent, PopoverTrigger, Spinner, Textarea } from "@nextui-org/react";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { toast } from "sonner";
import { AuthVerifyResponse, authKey } from "@/api/auth";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProfileForm = () => {
  const { authData, authIsLoading } = useAuth();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  if (authIsLoading) {
    return <Spinner />;
  }

  const editForm = useForm<EditProfileFormValidate>({
    resolver: zodResolver(EditProfileFormValidateSchema),
    defaultValues: {
      username: authData?.username || "",
      full_name: authData?.full_name || "",
      bio: authData?.bio || "",
      gender: authData?.gender ? "female" : "male",
      birthday: authData?.birthday || new Date(),
    },
  });

  const { mutate: userChangeAvatarMutate, isPending: userChangeAvatarIsPending } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    { avatar: File }
  >({
    mutationFn: async (params) => await userChangeAvatar(params.avatar),
    onSuccess: (res) => {
      toast.success("Change avatar successfully!");
      queryClient.setQueryData([authKey], (oldData: ApiSuccessResponse<AuthVerifyResponse>) =>
        oldData
          ? {
              ...oldData,
              data: {
                user: {
                  ...oldData.data.user,
                  avatar: res.data,
                },
              },
            }
          : oldData
      );
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Change avatar failed!");
    },
  });

  const { mutate: userEditProfileMutate, isPending: userEditProfileIsLoading } = useMutation<
    ApiSuccessResponse<UserResponse>,
    ApiErrorResponse,
    UserEditProfileParams
  >({
    mutationFn: async (data) => await userEditProfile(data),
    onSuccess: (res) => {
      toast.success("Profile updated successfully!");
      queryClient.setQueryData([authKey], (oldData: ApiSuccessResponse<AuthVerifyResponse>) =>
        oldData
          ? {
              ...oldData,
              data: {
                user: {
                  ...oldData.data.user,
                  ...res.data,
                },
              },
            }
          : oldData
      );
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Profile update failed!");
    },
  });

  useEffect(() => {
    if (authData?.birthday) {
      editForm.setValue("birthday", new Date(authData?.birthday));
    }
  }, [authData?.birthday, editForm]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    userChangeAvatarMutate({ avatar: file });
  };

  const onSubmit = async (data: EditProfileFormValidate) => {
    userEditProfileMutate({
      username: data.username,
      full_name: data.full_name,
      bio: data.bio,
      gender: data.gender,
      birthday: data.birthday,
    });
  };
  return (
    <div className="space-y-8 py-10">
      <div className="flex items-center gap-x-2 md:gap-x-5 justify-between rounded-2xl p-3 bg-[#EFEFEF]">
        <div className="flex items-center gap-x-4">
          <Avatar
            className="w-16 h-16 cursor-pointer"
            src={getUserAvatarURL(authData?.avatar)}
            alt="User Avatar"
            fallback={<Spinner />}
            onClick={() => !userChangeAvatarIsPending && avatarInputRef.current?.click()}
            showFallback={userChangeAvatarIsPending}
            isDisabled={userChangeAvatarIsPending}
            icon={userChangeAvatarIsPending ? <Spinner /> : undefined}
          />
          <div>
            <p className="font-medium">{authData?.username}</p>
            <p>{authData?.full_name}</p>
          </div>
        </div>
        <Button
          color="primary"
          className="text-white text-sm font-bold cursor-pointer"
          isLoading={userChangeAvatarIsPending}
          onClick={() => !userChangeAvatarIsPending && avatarInputRef.current?.click()}>
          Change photo
        </Button>
        <Input
          type="file"
          className="hidden"
          accept=".webp,.png,.jpg"
          ref={avatarInputRef}
          onChange={handleImageChange}
        />
      </div>
      <Form {...editForm}>
        <form onSubmit={editForm.handleSubmit(onSubmit)} className="space-y-8">
          <FormItem>
            <div className=" md:items-center gap-y-2 gap-x-8">
              <FormLabel className="font-bold w-20 md:text-right">Website</FormLabel>
              <FormControl aria-disabled className="mt-2">
                <Input placeholder="Website" disabled className="bg-[#EFEFEF] border-1" />
              </FormControl>
            </div>
            <FormDescription className="text-xs">
              Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change
              the websites in your bio.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormField
            control={editForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className="md:items-center gap-y-2 gap-x-8">
                  <FormLabel className="font-bold w-20 md:text-right">Username</FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      isRequired
                      autoFocus
                      isInvalid={!!editForm.formState.errors.username}
                      errorMessage={editForm.formState.errors.username?.message}
                      placeholder={authData?.username || ""}
                      variant="bordered"
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={editForm.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <div className="md:items-center gap-y-2 gap-x-8">
                  <FormLabel className="font-bold w-20 md:text-right">Full Name</FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      isRequired
                      isInvalid={!!editForm.formState.errors.full_name}
                      errorMessage={editForm.formState.errors.full_name?.message}
                      placeholder={authData?.full_name || ""}
                      variant="bordered"
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={editForm.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <div className="md:items-center gap-y-2 gap-x-8">
                  <FormLabel className="font-bold w-20 md:text-right">Bio</FormLabel>
                  <FormControl className="mt-2">
                    <div className="relative w-full">
                      <Textarea
                        className="resize-none"
                        isInvalid={!!editForm.formState.errors.bio || field.value.length > 150}
                        errorMessage={editForm.formState.errors.bio?.message || "Bio must be less than 150 characters."}
                        placeholder={authData?.bio || ""}
                        variant="bordered"
                        {...field}
                      />
                      <span className="absolute bottom-3 right-2 text-xs">{field.value?.length} / 150</span>
                    </div>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={editForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <div className=" md:items-center gap-y-2 gap-x-8">
                  <FormLabel className="font-bold w-20 md:text-right">Gender</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      editForm.setValue("gender", value);
                    }}
                    defaultValue={authData?.gender ? "female" : "male"}
                    {...field}>
                    <FormControl className="mt-2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormDescription className="text-xs">This wont be part of your public profile.</FormDescription>
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
                          about="Choose date of birth day"
                          variant="bordered"
                          className={cn(
                            "pl-3 text-left text-sm",
                            !field.value && "text-muted-foreground",
                            !!editForm.formState.errors.birthday && "border-danger text-danger"
                          )}>
                          {field.value ? (
                            <span>{new Date(field.value).toDateString()}</span>
                          ) : (
                            <span>Choose date of birth day</span>
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
                        disabled={(date) => date > new Date()}
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
              isLoading={userEditProfileIsLoading}
              // disabled={!isDirty || !isValid || isSubmitting}
              color="primary"
              className="pl-20 pr-20 pt-5 pb-5">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
