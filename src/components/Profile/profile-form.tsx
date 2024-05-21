"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@nextui-org/react';

const ProfileForm = () => {

    return (



        <div className="space-y-8 py-10 max-w-xl ">
            <div className="pb-5 pt-5 bg-[#E9E9E9]">
                <div className="flex items-center gap-x-2 md:gap-x-5 ">
                    <div className="md:w-20 flex md:justify-end">
                        <Avatar className="w-11 h-11 cursor-pointer" src="https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=600" />

                    </div>
                    <div className="">
                        <p className="font-medium">username</p>
                        <p className="">username</p>

                    </div>

                    <button className="text-white text-sm font-bold hover:text-white bg-primary rounded-md px-3 py-1">
                        Change photo
                    </button>
                </div>
            </div>


            {/* <Form {...formState}>
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        disabled
                        control={control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col md:flex-row md:items-center gap-y-2 gap-x-8">
                                    <FormLabel className="font-bold w-20 md:text-right">
                                        Website
                                    </FormLabel>
                                    <FormControl aria-disabled>
                                        <Input placeholder="Website" disabled {...field} />
                                    </FormControl>
                                </div>
                                <FormDescription className="md:ml-24 text-xs">
                                    Editing your links is only available on mobile. Visit the
                                    Instagram app and edit your profile to change the websites in
                                    your bio.
                                </FormDescription>
                                <FormMessage className="md:ml-24" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col md:flex-row md:items-center gap-y-2 gap-x-8">
                                    <FormLabel className="font-bold w-20 md:text-right">
                                        Bio
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea className="resize-none" {...field} />
                                    </FormControl>
                                </div>
                                <FormDescription className="md:ml-24 text-xs">
                                    {field.value?.length} / 150
                                </FormDescription>
                                <FormMessage className="md:ml-24" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col md:flex-row md:items-center gap-y-2 gap-x-8">
                                    <FormLabel className="font-bold w-20 md:text-right">
                                        Gender
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Prefer not to say" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="prefer-not-to-say">
                                                Prefer not to say
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <FormDescription className="md:ml-24 text-xs">
                                    This won't be part of your public profile.
                                </FormDescription>
                                <FormMessage className="md:ml-24" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="md:ml-24"
                    >
                        Submit
                    </Button>
                </form>
            </Form> */}
        </div>
    );
};

export default ProfileForm;
