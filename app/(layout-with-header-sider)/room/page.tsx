import icons from '@/assets/icons';
import RoomItem from '@/components/RoomItem';
import Image from 'next/image';

function Room() {
    return (
        <div className="mx-[10%] my-[1%]">
            <h2 className="text-[2.7rem] font-bold">Rooms</h2>
            <div className="my-[2.4rem] grid grid-cols-4 gap-[2.4rem]">
                <div className="flex cursor-pointer flex-col items-center justify-center gap-[2.4rem] rounded-[0.4rem] bg-[#242424] p-[2rem]">
                    <Image
                        src={icons.squarePlus}
                        alt="icon"
                        className="size-[4rem]"
                    />
                    <p className="text-[1.6rem] font-medium">Add new room</p>
                </div>
                <RoomItem />
                <RoomItem />
                <RoomItem />
                <RoomItem />
                <RoomItem />
                <RoomItem />
                <RoomItem />
            </div>
        </div>
    );
}

export default Room;
