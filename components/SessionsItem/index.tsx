import { useState } from 'react';

interface SessionsItemProps {
    nameDate: string;
    timeDate: string;
}

function SessionsItem({ nameDate, timeDate }: SessionsItemProps) {
    const [selected, setSelected] = useState<string>('');
    return (
        <div className="flex cursor-pointer flex-col items-center justify-around rounded-[0.8rem] border-[0.1rem] border-[#ccc] p-[1rem] duration-300 hover:border-[#5B8C00]">
            <p className="text-[1.6rem] font-bold text-[#6b7b8a]">{nameDate}</p>
            <p className="text-[1.6rem] font-bold">{timeDate}</p>
        </div>
    );
}

export default SessionsItem;
