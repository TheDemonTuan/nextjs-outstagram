import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const HighlightHashtags = ({ text, className }: { text: string; className: string }) => {
  const highlightHashtags = (text: string) => {
    const hashtagAndMentionRegex = /(#\w+)|(@\w+)/g;

    return text.split(hashtagAndMentionRegex).map((part, index) => {
      if (!part) {
        return null;
      }
      if (part.startsWith("#")) {
        return (
          <Link key={index} href={`/explore/tags/${part.slice(1)}`} passHref>
            <span className={cn(className)}>{part}</span>
          </Link>
        );
      }
      if (part.startsWith("@")) {
        return (
          <Link key={index} href={`/${part.slice(1)}`} passHref>
            <span className={cn(className)}>{part}</span>
          </Link>
        );
      }
      return part;
    });
  };

  return <span>{highlightHashtags(text)}</span>;
};

export default HighlightHashtags;
