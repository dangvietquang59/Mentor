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
            className={`${className}  overflow-hidden rounded-[0.8rem] bg-white shadow-xl`}
        >
            {children}
        </div>
    );
};

export default Wrapper;
