interface IButtonCustom {
    children?: string;
    className?: string;
    outline?: boolean;
}

function ButtonCustom({ children, className, outline = false }: IButtonCustom) {
    return (
        <button
            className={`rounded-[0.8rem] px-[1.5rem] py-[1rem] text-[1.6rem] font-medium uppercase ${outline ? 'border-[0.1rem] border-[#5DD62C] bg-transparent text-[#5DD62C]' : 'bg-[#5DD62C] text-[#202020]'} ${className}`}
        >
            {children}
        </button>
    );
}

export default ButtonCustom;
