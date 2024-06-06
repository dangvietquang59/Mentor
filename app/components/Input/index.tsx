import Image from 'next/image';
import React from 'react';

interface InputProps {
    placeHolder?: string;
    type?: string;
    className?: string;
    value?: string;
    rightIcon?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEnterOrIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({
    placeHolder,
    type = 'text',
    className,
    rightIcon,
    value,
    onChange,
    onEnterOrIconClick,
}) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onEnterOrIconClick) {
            onEnterOrIconClick();
        }
    };

    return (
        <div className="flex h-[4rem] w-full items-center rounded-[0.8rem] bg-[rgba(0,0,0,0.1)] p-[1rem]">
            <input
                placeholder={placeHolder}
                type={type}
                value={value}
                onChange={onChange}
                onKeyPress={handleKeyPress}
                className={`${className} h-full w-full bg-transparent text-[1.4rem] focus-within:outline-none`}
            />
            {rightIcon && onEnterOrIconClick && (
                <Image
                    src={rightIcon}
                    alt="send message"
                    onClick={onEnterOrIconClick}
                    className="cursor-pointer"
                    width={24} // specify width if needed
                    height={24} // specify height if needed
                />
            )}
        </div>
    );
};

export default Input;
