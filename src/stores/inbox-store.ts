import { InboxGetAllBubbleQuery } from "@/gql/graphql";
import { create } from "zustand";

interface InboxState {
    username: string;
    user: InboxGetAllBubbleQuery["inboxGetAllBubble"][number] | null;
    setUserName: (username: string) => void;
    setUser: (user: InboxGetAllBubbleQuery["inboxGetAllBubble"][number]) => void;
}

export const useInboxStore = create<InboxState>()((set) => ({
    username: "",
    user: null,
    setUserName: (username) => set({ username }),
    setUser: (user) => set({ user }),
}));
