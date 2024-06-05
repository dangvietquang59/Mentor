function Comments() {
    return (
        <div className="w-[70%]">
            <div className="flex items-center gap-[0.8rem]">
                <picture>
                    <img
                        src="https://avatars.githubusercontent.com/u/167729556?v=4"
                        alt="avatar"
                        className="h-[4rem] w-[4rem] rounded-full"
                    />
                </picture>
                <div className="flex flex-col">
                    <span className="text-[1.6rem] font-bold">
                        Ryomen Sukuna
                    </span>
                    <span className="text-[1.4rem] text-[#6B7B8A]">Mentee</span>
                </div>
            </div>
            <p className="mt-[1.2rem] rounded-[0.8rem] p-[1rem] text-[1.4rem]">
                Alo alo 1 2 3 4 hehehe Alo alo 1 2 3 4 hehehe Alo alo 1 2 3 4
                hehehe Alo alo 1 2 3 4 hehehe Alo alo 1 2 3 4 hehehe Alo alo 1 2
                3 4 hehehe Alo alo 1 2 3 4 hehehe
            </p>
            <div className="flex items-center gap-[1.2rem] p-[1rem]">
                <span className="text-[1.2rem] text-[#6B7B8A]">
                    2 giờ trước
                </span>
                <span className="cursor-pointer text-[1.2rem] text-[#6B7B8A]">
                    Like
                </span>
                <span className="cursor-pointer text-[1.2rem] text-[#6B7B8A]">
                    Reply
                </span>
            </div>
        </div>
    );
}

export default Comments;
