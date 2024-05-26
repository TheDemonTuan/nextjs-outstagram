import { EmojiLookBottomIcon, HeartIcon, ImgBoxIcon, MicIcon } from "@/icons";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./message-input";

const FormInbox = () => {
  const [message, setMessage] = useState("");
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {};

  return (
    <div className="sticky bottom-0 py-4 px-4 bg-white items-center gap-2 lg:gap-4 w-full">
      <div className="flex text-xs font-light text-gray-500 px-3 justify-end py-3">
        Seen just now
      </div>
      <div className=" border-1 py-0 px-4  flex items-center rounded-full gap-2 lg:gap-4 w-full ">
        <EmojiLookBottomIcon />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <MessageInput
            id="message"
            errors={errors}
            required
            placeholder="Message..."
          />
          {/* <button type="submit" className="p-2 cursor-pointer transition">
            <span className="hover:text-sky-900 font-bold text-sky-500">
              Send
            </span>
          </button> */}
          {/* 3 icon sẽ hiển thị khi chưa nhập */}
          <div className="flex flex-row">
            <div className="p-2">
              <MicIcon />
            </div>
            <div className="p-2">
              <ImgBoxIcon />
            </div>
            <div className="p-2">
              <HeartIcon />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormInbox;
