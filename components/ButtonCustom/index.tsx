import Link from 'next/link';

interface IButtonCustom {
    children?: string;
    className?: string;
    outline?: boolean;
    noBorder?: boolean;
    path?: string;
    disabled?: boolean;
    onClick?: () => void;
}

function ButtonCustom({
    children,
    className,
    outline = false,
    path,
    disabled = false,
    onClick,
}: IButtonCustom) {
    const baseClassName = `rounded-[0.8rem] px-[1.5rem] py-[1rem] text-[1.6rem] font-medium ${className}`;
    const disabledClassName = 'opacity-50 cursor-not-allowed';

    const content = (
        <button
            className={`${baseClassName} ${outline ? 'border-[0.1rem] border-[#5DD62C] bg-transparent text-[#5DD62C]' : 'bg-gradient-to-r from-[#355429] to-[#5dd62c] text-[#202020]'} ${disabled ? disabledClassName : ''}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );

    return path ? <Link href={path}>{content}</Link> : content;
}

export default ButtonCustom;
