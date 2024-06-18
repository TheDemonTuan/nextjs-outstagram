import { create } from "zustand";

interface CommentState {
  content: string;
  setContent: (content: string) => void;
  parentID: string;
  setParentID: (parentID: string) => void;
  replyUsername: string;
  setReplyUsername: (replyUsername: string) => void;
}

export const useCommentStore = create<CommentState>()((set) => ({
  content: "",
  setContent: (content: string) => set({ content }),
  parentID: "",
  setParentID: (parentID: string) => set({ parentID }),
  replyUsername: "",
  setReplyUsername: (replyUsername: string) => set({ replyUsername }),
}));
