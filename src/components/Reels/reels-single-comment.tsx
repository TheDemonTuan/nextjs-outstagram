import Link from "next/link";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function SingleComment() {
  return (
    <>
      <div id="SingleComment" className="flex items-center justify-between px-8 mt-4">
        <div className="flex items-center relative w-full">
          <Link href={`/`}>
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=400" />
            </Avatar>
          </Link>
          <div className="ml-14 pt-0.5 w-full">
            <div className="text-[18px] font-semibold flex items-center justify-between">
              <span className="flex items-center">
                usernameComment -<span className="text-[12px] text-gray-600 font-light ml-1">Time create comment</span>
              </span>

              {/* {contextUser?.user?.id == comment.profile.user_id ? (
                                <button 
                                    disabled={isDeleting} 
                                    onClick={() => deleteThisComment()}
                                >
                                    {isDeleting 
                                        ? <BiLoaderCircle className="animate-spin" color="#E91E62" size="20"/>
                                        : <BsTrash3 className="cursor-pointer" size="25"/>
                                    }
                                </button>
                            ) : null} */}
            </div>

            <p className="text-[15px] font-light">comment text</p>
          </div>
        </div>
      </div>
    </>
  );
}
