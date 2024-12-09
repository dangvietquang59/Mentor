import { create } from 'zustand';
import Cookies from 'js-cookie';
import { UserType } from '@/types/user';

interface UserState {
    user: UserType | null;
    setUser: (user: UserType) => void;
    logout: () => void;
    updateUser: (userData: Partial<UserType>) => void;
}

export const useUserStore = create<UserState>((set) => {
    const userFromCookie = Cookies.get('profile');
    const parsedUser = userFromCookie ? JSON.parse(userFromCookie) : null;

    return {
        user: parsedUser,
        setUser: (user: UserType) => {
            Cookies.set('profile', JSON.stringify(user), { expires: 7 });
            set({ user });
        },
        logout: () => {
            Cookies.remove('profile');
            set({ user: null });
        },
        updateUser: (userData: Partial<UserType>) =>
            set((state) => {
                const updatedUser = state.user
                    ? { ...state.user, ...userData }
                    : null;
                if (updatedUser) {
                    Cookies.set('profile', JSON.stringify(updatedUser), {
                        expires: 7,
                    });
                } else {
                    Cookies.remove('profile');
                }
                return { user: updatedUser };
            }),
    };
});
