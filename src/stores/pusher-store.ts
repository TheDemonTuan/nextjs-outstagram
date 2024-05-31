import Pusher from "pusher-js";
import { create } from "zustand";

interface PusherState {
  pusherClient: Pusher;
  setPusherClient: (client: Pusher) => void;
}

export const usePusherStore = create<PusherState>()((set) => ({
  pusherClient: new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? "", {
    cluster: "ap1",
  }),
  setPusherClient: (client) => set({ pusherClient: client }),
}));
