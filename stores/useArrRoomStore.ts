import { GroupChatResponseType } from '@/types/response/groupChat';
import { create } from 'zustand';

interface ChatStore {
    rooms: GroupChatResponseType[];
    setRooms: (rooms: GroupChatResponseType[]) => void;
    addRoom: (room: GroupChatResponseType) => void;
    removeRoom: (roomId: string) => void;
}

export const useArrRoomStore = create<ChatStore>((set) => ({
    rooms: [],
    setRooms: (rooms) => set({ rooms }),
    addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
    removeRoom: (roomId) =>
        set((state) => ({
            rooms: state.rooms.filter((room) => room._id !== roomId),
        })),
}));
