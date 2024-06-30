import { create } from "zustand";

export interface Notifications {
    type: string;
    username: string;
    avatar: string;
    message: string;
    createdAt: string;
}

interface NotificationsState {
    total: number;
    resetTotal: () => void;
    notifications: Notifications[];
    addNotification: (notification: Notifications) => void;
    clearNotifications: () => void;
}

export const useNotificationsStore = create<NotificationsState>()((set) => ({
    total: 0,
    resetTotal: () => set({ total: 0 }),
    notifications: [],
    addNotification: (notification) => set((state) => ({ notifications: [notification, ...state.notifications], total: state.total + 1 })),
    clearNotifications: () => set({ notifications: [], total: 0 }),
}));
