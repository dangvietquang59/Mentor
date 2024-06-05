import React from 'react';

interface InputProps {
    placeHolder?: string;
    type?: string;
    className?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    placeHolder,
    type = 'text',
    className,
    value,
    onChange,
}) => {
    return (
        <div className="flex h-[4rem] w-full items-center rounded-[0.8rem] bg-[rgba(0,0,0,0.1)] p-[1rem]">
            <input
                placeholder={placeHolder}
                type={type}
                value={value}
                onChange={onChange}
                className={`${className} h-full w-full bg-transparent text-[1.4rem] focus-within:outline-none`}
            />
        </div>
    );
};

export default Input;
