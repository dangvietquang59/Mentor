function Room() {
    return (
        <div className="flex">
            <div className="w-[15%]">
                <p className="text-[2rem] font-bold">List joined</p>
                <ul className="grid gap-[1.2rem]">
                    <li className="flex items-center gap-[0.8rem]">
                        <picture>
                            <img
                                src="https://avatars.githubusercontent.com/u/167729556?s=60&v=4"
                                alt="avatar"
                                className="h-[3rem] w-[3rem] rounded-full"
                            />
                        </picture>
                        <p className="text-[1.6rem] font-bold">Ryomen Sukuna</p>
                    </li>
                    <li className="flex items-center gap-[0.8rem]">
                        <picture>
                            <img
                                src="https://avatars.githubusercontent.com/u/167729556?s=60&v=4"
                                alt="avatar"
                                className="h-[3rem] w-[3rem] rounded-full"
                            />
                        </picture>
                        <p className="text-[1.6rem] font-bold">Ryomen Sukuna</p>
                    </li>
                </ul>
            </div>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/FNaGG_jVcBo"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default Room;
