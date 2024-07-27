import React, { ReactNode } from 'react';

interface WrapperProps {
    children: ReactNode;
    className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({
    children,
    className,
}: WrapperProps) => {
    return (
        <div
            className={`${className}  overflow-hidden rounded-[0.8rem] border-[0.1rem] border-[#ccc] bg-black`}
        >
            {children}
        </div>
    );
};

export default Wrapper;
