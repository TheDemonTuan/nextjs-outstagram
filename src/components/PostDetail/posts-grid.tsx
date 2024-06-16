import { MessageCircleIcon } from "@/icons";
import { HeartIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { IoMdUmbrella } from "react-icons/io";

function PostsGrid() {
  //   if (posts?.length === 0) {
  //     return (
  //       <div className="flex flex-col items-center justify-center space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
  //         <p className="font-semibold text-sm text-neutral-400">No more posts.</p>
  //       </div>
  //     );
  //   }

  return (
    <div className="grid grid-cols-3 gap-0.5">
      <Link href="/" className="relative flex items-center justify-center h-44 md:h-64 lg:h-80 group col-span-1">
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1717255213/posts/ov8lv90mznc5zufsyo2p.webp"
          alt="Post preview"
          fill
          className="object-cover -z-10 transition group-hover:filter group-hover:blur-[2px] group-hover:brightness-90"
        />
        <div className="opacity-0 group-hover:opacity-100 flex transition items-center justify-center space-x-6">
          <div className="flex items-center font-bold space-x-1">
            <HeartIcon className="text-white fill-white" />
            <p className="text-white">1</p>
          </div>

          <div className="flex items-center font-bold space-x-1">
            <MessageCircleIcon className="text-white fill-white" />
            <p className="text-white">1</p>
          </div>
        </div>
      </Link>

      <Link href="/" className="relative flex items-center justify-center h-44 md:h-64 lg:h-80 group col-span-1">
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1717255213/posts/ov8lv90mznc5zufsyo2p.webp"
          alt="Post preview"
          fill
          className="object-cover -z-10 transition group-hover:filter group-hover:blur-[2px] group-hover:brightness-90"
        />
        <div className="opacity-0 group-hover:opacity-100 flex transition items-center justify-center space-x-6">
          <div className="flex items-center font-bold space-x-1">
            <HeartIcon className="text-white fill-white" />
            <p className="text-white">1</p>
          </div>

          <div className="flex items-center font-bold space-x-1">
            <MessageCircleIcon className="text-white fill-white" />
            <p className="text-white">1</p>
          </div>
        </div>
      </Link>

      <Link href="/" className="relative flex items-center justify-center h-44 md:h-64 lg:h-80 group col-span-1">
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1717255213/posts/ov8lv90mznc5zufsyo2p.webp"
          alt="Post preview"
          fill
          className="object-cover -z-10 transition group-hover:filter group-hover:blur-[2px] group-hover:brightness-90"
        />
        <div className="opacity-0 group-hover:opacity-100 flex transition items-center justify-center space-x-6">
          <div className="flex items-center font-bold space-x-1">
            <HeartIcon className="text-white fill-white" />
            <p className="text-white">1</p>
          </div>

          <div className="flex items-center font-bold space-x-1">
            <MessageCircleIcon className="text-white fill-white" />
            <p className="text-white">1</p>
          </div>
        </div>
      </Link>

      <Link href="/" className="relative flex items-center justify-center h-44 md:h-64 lg:h-80 group col-span-1">
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1717255213/posts/ov8lv90mznc5zufsyo2p.webp"
          alt="Post preview"
          fill
          className="object-cover -z-10 transition group-hover:filter group-hover:blur-[2px] group-hover:brightness-90"
        />
        <div className="opacity-0 group-hover:opacity-100 flex transition items-center justify-center space-x-6">
          <div className="flex items-center font-bold space-x-1">
            <HeartIcon className="text-white fill-white" />
            <p className="text-white">1</p>
          </div>

          <div className="flex items-center font-bold space-x-1">
            <MessageCircleIcon className="text-white fill-white" />
            <p className="text-white">1</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostsGrid;
