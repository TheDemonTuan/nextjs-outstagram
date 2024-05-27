import EditProfileForm from "@/components/Settings/edit-profile-form";
import React from "react";

const EditProfile = () => {
  return (
    <div className="flex flex-col px-40">
      <h1 className="text-2xl font-medium">Edit profile</h1>
      <EditProfileForm />
    </div>
  );
};

export default EditProfile;
