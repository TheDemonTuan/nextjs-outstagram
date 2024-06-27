"use client";

import { Button } from "primereact/button";
import { Mention } from "primereact/mention";
import React, { useState } from "react";
import { InputOtp } from "primereact/inputotp";
import { Message } from "primereact/message";

const HighlightTextarea = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const parseHashtags = (text: any) => {
    const parts = text.split(/(@\w+)/);
    return parts.map((part: any, index: any) =>
      part.startsWith("@") ? (
        <span key={index} style={{ color: "blue" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <div className="flex flex-column align-items-center">
        <p className="font-bold text-xl mb-2">Authenticate Your Account</p>
        <p className="text-color-secondary block mb-5">Please enter the code sent to your phone.</p>
        <InputOtp
          value={value}
          onChange={(e) => setValue("e.value")}
          length={6}
          // inputTemplate={customInput}
          style={{ gap: 0 }}
        />
        <div className="flex justify-content-between mt-5 align-self-stretch">
          <Button label="Resend Code" link className="p-0"></Button>
          <Button label="Submit Code"></Button>
        </div>
      </div>
    </>
  );
};

export default HighlightTextarea;
