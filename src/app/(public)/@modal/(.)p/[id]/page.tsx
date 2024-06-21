'use client'

import ModalLoading from "@/components/modal-loading";
import dynamic from "next/dynamic";
import React from "react";

const PostView = dynamic(() => import("@/components/PostDetail/post-view"), {
  loading: () => <ModalLoading />,
  ssr: false,
});

type Props = {
  params: {
    id: string;
  };
};

const PostModal = ({ params: { id } }: Props) => {
  return <PostView id={id} />;
};

export default PostModal;
