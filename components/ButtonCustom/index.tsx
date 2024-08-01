import Link from 'next/link';

interface IButtonCustom {
    children?: string;
    className?: string;
    outline?: boolean;
    noBorder?: boolean;
    path?: string;
}

function ButtonCustom({
    children,
    className,
    outline = false,
    noBorder = false,
    path = '#',
}: IButtonCustom) {
    if (noBorder) {
        return (
            <button
                className={`rounded-[0.8rem] px-[1.5rem] py-[1rem] text-[1.6rem] font-medium ${className}`}
            >
                <Link href={path}>{children}</Link>
            </button>
        );
    }
    return (
        <button
            className={`rounded-[0.8rem] px-[1.5rem] py-[1rem] text-[1.6rem] font-medium ${outline ? 'border-[0.1rem] border-[#5DD62C] bg-transparent text-[#5DD62C]' : 'bg-gradient-to-r from-[#355429] to-[#5dd62c] text-[#202020]'} ${className}`}
        >
            <Link href={path}>{children}</Link>
        </button>
    );
}

export default ButtonCustom;
