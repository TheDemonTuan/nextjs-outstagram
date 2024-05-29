import { z } from "zod";

export const CommentFormValidateSchema = z.object({
    id: z.string(),
    body: z.string(),
    postId: z.string(),
});

export type CommentFormValidate = z.infer<typeof CommentFormValidateSchema>;
