import Image from 'next/image';
import TimeItem from '../TimeItem';
import icons from '@/assets/icons';
import SessionsItem from '../SessionsItem';
import ButtonCustom from '../ButtonCustom';

function BookingTime() {
    return (
        <>
            <div className="min-h-[40rem] rounded-[0.4rem] bg-[#242526] p-[2rem]">
                <div className="mb-[2.4rem]">
                    <h2 className="text-[2rem] font-bold text-[#5DD62C]">
                        Available sessions
                    </h2>

                    <span className="text-[1.6rem] font-bold text-[#6B7B8A]">
                        Book 1:1 sessions from the options based on your needs
                    </span>
                </div>
                <div className="grid grid-cols-5 gap-[0.8rem]">
                    <SessionsItem nameDate="Sunday" timeDate="06 Sep" />

                    <div className="flex items-center justify-center">
                        <span className="cursor-pointer text-[1.6rem] font-bold duration-300 hover:text-[#5B8C00]">
                            View all
                        </span>
                    </div>
                </div>
                <div className="mt-[2.4rem]">
                    <div className="flex items-center justify-between border-b-[0.1rem] border-b-[#ccc] p-[1rem]">
                        <span className="text-[2rem] font-bold">
                            Available time slots
                        </span>
                        <button>
                            <Image
                                src={icons.chevronDown}
                                alt="icon"
                                className="rotate-[-90deg]"
                            />
                        </button>
                    </div>
                    <div className="mt-[2.4rem] grid grid-cols-3 gap-[0.8rem]">
                        <TimeItem />
                        <TimeItem />
                        <TimeItem />
                        <TimeItem />
                        <TimeItem />
                        <TimeItem />
                    </div>
                    <ButtonCustom className="mt-[2.4rem] h-[7rem] w-full text-[2rem] text-white">
                        Book session for 02 Jun 2024
                    </ButtonCustom>
                </div>
            </div>
        </>
    );
}

export default BookingTime;
