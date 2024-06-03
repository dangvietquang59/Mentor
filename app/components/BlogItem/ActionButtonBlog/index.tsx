import Image from 'next/image';

interface IActionButtonProps {
    icon: string;
    title: string;
}
function ActionButtonBlog({ icon, title }: IActionButtonProps) {
    return (
        <button className="flex items-center gap-[0.8rem] rounded-[0.8rem] p-[1rem] duration-300 hover:bg-[rgba(0,0,0,0.1)]">
            <Image src={icon} alt="icon" className="h-[1.5rem] w-[1.5rem]" />
            <span className="text-[1.4rem] text-[#6B7B8A]">{title}</span>
        </button>
    );
}

export default ActionButtonBlog;
