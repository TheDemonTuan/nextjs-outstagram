import React from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required: boolean;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  required,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        placeholder={placeholder}
        className="text-black font-normal py-2 px-2 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
