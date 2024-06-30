import OauthForm from "@/components/Oauth/oauth-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FacebookIcon, InstagramFakeIcon } from "@/icons";
import { Spinner } from "@nextui-org/react";
import React from "react";

const OauthFacebook = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center">
      <div className="text-3xl w-1/2 px-10 pb-28">
        <Avatar className="w-52 h-52 mx-20">
          <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <AvatarFallback>
            <Spinner size="lg" />
          </AvatarFallback>{" "}
        </Avatar>
        <FacebookIcon />
        <p className="ml-8 -mt-3">Facebook helps you connect and share with the people in your life.</p>
      </div>
      <OauthForm />
    </div>
  );
};

export default OauthFacebook;
