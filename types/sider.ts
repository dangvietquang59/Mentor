import { ReactNode } from 'react';

export type SiderType = {
    icon?: ReactNode;
    activeIcon?: string;
    title: string;
    url: string;
    isSelected?: boolean;
    onItemClick?: () => void;
};
