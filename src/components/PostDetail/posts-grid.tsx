import { Post } from "@/gql/graphql";
import { ClipIcon, LikeHeartIcon, MessageCircleIcon, MultiFileIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { redirectHard } from "@/actions";
import { PostType } from "@/api/post";
import { ImBlocked } from "react-icons/im";

const PostsGrid = ({ postSuggestions }: { postSuggestions: Post[] }) => {
  if (postSuggestions?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
        <p className="font-semibold text-sm text-neutral-400">No more posts.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {postSuggestions.map((post) => {
        const postFiles = post?.post_files || [];
        const firstFile = postFiles[0];
        return (
          <Link
            href={post.type === PostType.REEL ? `/r/${post.id}` : `/p/${post.id}`}
            onClick={(e) => {
              if (post.type !== PostType.REEL) {
                e.preventDefault();
                redirectHard(`/p/${post.id}`);
              }
            }}
            key={post.id}
            className="relative flex items-center justify-center h-44 md:h-64 lg:h-80 group col-span-1">
            {post.type && firstFile?.url ? (
              <video
                key={"video" + firstFile.id}
                src={firstFile?.url || "/camera-b.png"}
                controls={false}
                className="object-cover w-full h-full -z-10 transition group-hover:filter group-hover:blur-[2px] group-hover:brightness-90"
              />
            ) : (
              <Image
                src={firstFile?.url || ""}
                alt="Post preview"
                fill
                className="object-cover -z-10 transition group-hover:filter group-hover:blur-[2px] group-hover:brightness-90 "
              />
            )}
            {post.type === PostType.REEL && (
              <div className="absolute top-2 right-2 bg-transparent bg-opacity-75 p-1 rounded-full">
                <ClipIcon />
              </div>
            )}
            {postFiles?.length > 1 && (
              <div className="absolute top-2 right-2 bg-transparent bg-opacity-75 p-1 rounded-full">
                <MultiFileIcon />
              </div>
            )}

            {!post.active && (
              <div className="absolute bottom-2 left-2 bg-transparent bg-opacity-75 p-1 rounded-full">
                <ImBlocked size={22} color="#FFFFFF" />
              </div>
            )}

            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-6 rounded-none">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">{post.post_likes?.length || 0}</p>
              </div>

              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">{post.post_comments?.length || 0}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostsGrid;
