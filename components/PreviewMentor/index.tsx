import images from '@/assets/img';
import { UserType } from '@/types/user';

interface PreviewMentor {
    user: UserType;
}

function PreviewMentor({ user }: PreviewMentor) {
    return (
        <div className="relative h-[30rem] w-full overflow-hidden rounded-[0.8rem]">
            <img
                src={user?.imageUrl || images.defaultAvatar.src}
                alt="avatar"
                className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4 text-white">
                <h3 className="text-[1.8rem] font-bold">{user?.fullName}</h3>
                <h4 className="text-[1.4rem]">{user?.bio?.name}</h4>
            </div>
        </div>
    );
}

export default PreviewMentor;
