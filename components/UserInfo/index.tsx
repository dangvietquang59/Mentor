import { Avatar, Checkbox } from 'antd';
interface UserInfoProps {
    imageUrl: string;
    name: string;
}
function UserInfo({ imageUrl, name }: UserInfoProps) {
    return (
        <Checkbox>
            <div className="cursor-pointer p-[0.5rem]">
                <div className="flex items-center gap-[0.8rem]">
                    <Avatar src={imageUrl} alt="name" size={40} />
                    <p className="text-[1.4rem] text-white">{name}</p>
                </div>
            </div>
        </Checkbox>
    );
}

export default UserInfo;
