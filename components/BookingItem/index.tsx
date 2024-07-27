function BookingItem() {
    return (
        <div className="mt-[2.4rem] flex w-[60rem] items-center gap-[2.4rem] rounded-[0.8rem] border border-[#7cb305] p-[1rem]">
            <picture className="w-[40%]">
                <img
                    src="https://png.pngtree.com/background/20230401/original/pngtree-classroom-classroom-cartoon-background-picture-image_2253358.jpg"
                    alt="avatar"
                    className="h-full rounded-[0.8rem] object-cover"
                />
            </picture>
            <div className="flex grow flex-col justify-between">
                <p className="text-[2rem] font-bold">Session Information</p>
                <ul className="grid list-none gap-[0.8rem]">
                    <li className="text-[1.6rem]">
                        Mentor:{' '}
                        <span className="font-bold">Đặng Việt Quang</span>
                    </li>
                    <li className="text-[1.6rem]">
                        Phone: <span className="font-bold">0359088784</span>
                    </li>
                    <li className="text-[1.6rem]">
                        Email:{' '}
                        <span className="font-bold underline">
                            dvquang5902@gmail.com
                        </span>
                    </li>
                    <li className="text-[1.6rem]">
                        Link join:{' '}
                        <a
                            href="https://www.notion.so/C-c-m-c-h-u-ch-cd895d0c39da4ae3979909038d9a2d5a"
                            className="font-bold text-[#7cb305] hover:underline"
                        >
                            Meeting team
                        </a>
                    </li>
                    <li className="text-[1.6rem]">
                        Coming at: <span className="font-bold">8:30</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default BookingItem;
