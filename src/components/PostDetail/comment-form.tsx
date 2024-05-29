"use client";

import { cn } from "@/lib/utils";
import { Form, FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { CommentFormValidate, CommentFormValidateSchema } from "./comment-form.validate";
import { Spinner } from "@nextui-org/react";

function CommentForm({
  postId,
  className,
  inputRef,
}: {
  postId: string;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  const commentForm = useForm<CommentFormValidate>({
    resolver: zodResolver(CommentFormValidateSchema),
    defaultValues: {
      body: "",
      postId,
    },
  });

  const body = commentForm.watch("body");
  const isSubmitting = commentForm.formState.isSubmitting;

  const onSubmit = async (data: CommentFormValidate) => {
    commentForm.reset();
  };

  return (
    <FormProvider {...commentForm}>
      <form
        onSubmit={commentForm.handleSubmit(onSubmit)}
        className={cn(
          "border-b relative border-gray-200 dark:border-neutral-800 py-3 flex items-center space-x-2 w-full px-3",
          className
        )}>
        {isSubmitting && (
          <div className="flex justify-center items-center w-full absolute">
            <Spinner className="h-4 w-4 animate-spin" />
          </div>
        )}
        <FormField
          control={commentForm.control}
          name="body"
          render={({ field }) => {
            return (
              <FormItem className="w-full flex">
                <FormControl>
                  <input
                    disabled={isSubmitting}
                    type="text"
                    placeholder="Add a comment..."
                    className="bg-transparent text-sm border-none focus:outline-none flex-1 dark:text-neutral-400 placeholder-neutral-400 font-medium disabled:opacity-30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <button
          disabled={!body.trim().length || isSubmitting}
          type="submit"
          className="text-sky-500 text-sm font-semibold hover:text-sky-700 dark:hover:text-white disabled:cursor-not-allowed  dark:disabled:text-slate-500 disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500">
          Post
        </button>
      </form>
    </FormProvider>
  );
}

export default CommentForm;
