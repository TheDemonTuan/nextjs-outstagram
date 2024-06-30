import { OAuthProvider } from "@/api/auth";
import { InboxGetAllBubbleQuery } from "@/gql/graphql";
import { create } from "zustand";

interface OAuthState {
    email: string;
    full_name: string;
    provider: OAuthProvider;
    setData: (data: { email: string; full_name: string; provider: OAuthProvider }) => void;
}

export const useOAuthStore = create<OAuthState>()((set) => ({
    email: "",
    full_name: "",
    provider: OAuthProvider.FACEBOOK,
    setData: (data) => set({ ...data }),
}));
