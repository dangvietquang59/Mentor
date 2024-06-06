export type SiderType = {
    icon?: string;
    activeIcon?: string;
    title:string;
    url:string;
    isSelected?: boolean;
    onItemClick?: ()=> void
}