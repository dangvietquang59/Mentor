import Image from 'next/image';

interface ButtonStreamActionProps {
    icon: string;
    isActive: boolean;
    name: string;
    onClick: () => void;
}

function ButtonStreamAction({
    icon,
    isActive,
    name,
    onClick,
}: ButtonStreamActionProps) {
    return (
        <button
            className={`flex items-center justify-center gap-[0.8rem] rounded-[0.8rem] ${isActive ? 'bg-[#5DD62C]' : 'bg-red-400'} p-[1rem_2rem]`}
            onClick={onClick}
        >
            <Image src={icon} alt="icon" />
            <span className="text-[1.6rem] font-medium text-black">{name}</span>
        </button>
    );
}

export default ButtonStreamAction;
