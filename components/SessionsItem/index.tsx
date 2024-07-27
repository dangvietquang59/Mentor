function SessionsItem() {
    return (
        <div className="flex cursor-pointer flex-col items-center justify-around rounded-[0.8rem] border-[0.1rem] border-[#ccc] p-[1rem] duration-300 hover:border-[#5B8C00]">
            <p className="text-[1.6rem] font-bold text-[#6b7b8a]">Sun</p>
            <p className="text-[1.6rem] font-bold">02 Jun</p>
            <p className="text-[1.6rem] font-bold text-[#5B8C00]">16 slot</p>
        </div>
    );
}

export default SessionsItem;
