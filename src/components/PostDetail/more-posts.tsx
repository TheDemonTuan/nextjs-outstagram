import Link from "next/link";
import PostsGrid from "./posts-grid";

const MorePosts = () => {
  return (
    <div className="flex flex-col space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
      <p className="font-semibold text-sm text-neutral-500 dark:text-neutral-400">
        More posts from{" "}
        <Link href="/" className="dark:text-white text-black hover:opacity-50">
          postUserName
        </Link>{" "}
      </p>

      <PostsGrid />
    </div>
  );
};

export default MorePosts;
