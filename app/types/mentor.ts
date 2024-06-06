export type AttributeMentorItem = {
    title:string;
    icon?:string;
}
export type MentorItemType = {
    name:string;
    url:string;
    position?:string;
    attributes:AttributeMentorItem[]
}