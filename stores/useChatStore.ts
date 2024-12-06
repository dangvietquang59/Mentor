import { create } from 'zustand';

interface ChatStore {
    isOpen: boolean;
    toggleChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    isOpen: false,
    toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
}));
