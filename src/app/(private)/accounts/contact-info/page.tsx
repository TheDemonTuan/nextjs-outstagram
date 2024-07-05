import React from "react";
import ContactInfoForm from "@/components/Settings/contact-info-form";

const ContactInfo = () => {
  return (
    <div className="flex flex-col px-48">
      <h1 className="text-2xl font-medium">Contact information</h1>
      <ContactInfoForm />
    </div>
  );
};

export default ContactInfo;
