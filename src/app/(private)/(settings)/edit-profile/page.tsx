import ProfileForm from '@/components/Profile/profile-form';
import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";

const EditProfile = () => {
  return (
    <div className="px-12">
      <div className="flex items-center space-x-2">
        <FaArrowLeftLong className="text-xl" />
        <h1 className="text-2xl font-medium">Edit profile</h1>
      </div>
      <ProfileForm />
    </div>
  );
}

export default EditProfile