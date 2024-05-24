import ProfileForm from "@/components/Profile/edit-profile-form";
import React from "react";

const EditProfile = () => {
  return (
    <div className="flex flex-col px-48">
      <h1 className="text-2xl font-medium">Edit profile</h1>
      <ProfileForm />
    </div>
  );
};

export default EditProfile;
