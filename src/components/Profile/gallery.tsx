"use client";

import { UserResponse } from "@/api/user";
import { GET_ALL_POST_BY_USER_ID, PostGetByUserNameResponse } from "@/graphql/query";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Gallery = ({ user }: { user: UserResponse }) => {
  const [getSearchResults, { data: postsData, loading: postsLoading, error: postsError }] =
    useLazyQuery<PostGetByUserNameResponse>(GET_ALL_POST_BY_USER_ID);

  useEffect(() => {
    getSearchResults({ variables: { username: user.username } });
  }, [user]);

  useEffect(() => {
    if (postsError) {
      toast.error("Error fetching posts");
    }
  }, [postsError]);

  return (
    <div className="grid grid-cols-3 gap-1 mx-28">
      <div className="relative group cursor-pointer">
        <img
          className="object-cover overflow-hidden h-[310] fill"
          src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
          <div className="text-white">Hover Content</div>
        </div>
      </div>
      <img
        className="object-cover overflow-hidden h-[310] fill"
        src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
      />
      <img
        className="object-cover overflow-hidden h-[310] fill"
        src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
      />
      <img
        className="object-cover overflow-hidden h-[310] fill"
        src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
      />
      <img
        className="object-cover overflow-hidden h-[310] fill"
        src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
      />
    </div>
  );
};

export default Gallery;
