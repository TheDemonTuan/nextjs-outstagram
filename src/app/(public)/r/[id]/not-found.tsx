import Link from "next/link";

export default function ReelDetailNotFound() {
  return (
    <div className="flex flex-col items-center text-center w-full gap-2 p-9 mt-">
      <h2 className="text-2xl font-semibold">Sorry, this page isn&apos;t available.</h2>
      <p className="text-base p-6">
        The link you followed may be broken, or the page may have been removed.
        <Link href="/reels" className="text-[#00376b]">
          {" "}
          Go back to Outstagram.
        </Link>
      </p>
    </div>
  );
}
