// app/rooms/page.tsx
import bookingApi from '@/apis/bookingApi';
import RoomItem from '@/components/RoomItem';
import { UserType } from '@/types/user';
import variables from '@/utils/constants/variables';
import { getAccessTokenServer } from '@/utils/functions/getAccessTokenServer';
import { cookies } from 'next/headers';

const Rooms = async () => {
    const profile: UserType = JSON.parse(
        cookies().get(variables.PROFILE)?.value || '',
    );
    const token = getAccessTokenServer()?.value;
    if (!token) return;
    const rooms = await bookingApi.getByUserId(profile?._id, token);
    return (
        <div className="mx-[10%] my-[1%]">
            <h2 className="text-[2.7rem] font-bold">Rooms</h2>
            <div className="my-[2.4rem] grid grid-cols-4 gap-[2.4rem]">
                {/* <div className="flex cursor-pointer flex-col items-center justify-center gap-[2.4rem] rounded-[0.4rem] bg-[#242424] p-[2rem]">
                    <Image
                        src={icons.squarePlus}
                        alt="Add new room icon"
                        className="size-[4rem]"
                    />
                    <p className="text-[1.6rem] font-medium">Add new room</p>
                </div> */}
                {rooms &&
                    rooms?.length > 0 &&
                    rooms.map((room, index) => (
                        <RoomItem
                            key={index}
                            name={room?.freetimeDetailId?.name}
                            from={room?.freetimeDetailId?.from}
                            to={room?.freetimeDetailId?.to}
                            id={room?._id}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Rooms;
