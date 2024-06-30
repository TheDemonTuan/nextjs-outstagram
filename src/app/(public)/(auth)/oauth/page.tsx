import OauthForm from "@/components/OAuth/oauth-form";
import React from "react";

const OauthFacebook = () => {
  return (
    <div className="h-dvh flex flex-col justify-center items-center">
      <p className="ml-8 font-bold text-lg">Last step to complete your registration</p>
      <OauthForm />
    </div>
  );
};

export default OauthFacebook;
