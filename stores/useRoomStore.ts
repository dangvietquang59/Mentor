import { GroupChatResponseType } from '@/types/response/groupChat';
import { create } from 'zustand';

interface Store {
    selectedRoom: GroupChatResponseType | undefined;
    setSelectedRoom: (room: GroupChatResponseType | undefined) => void;
}

export const useRoomStore = create<Store>((set) => ({
    selectedRoom: undefined,
    setSelectedRoom: (room) => set({ selectedRoom: room }),
}));
