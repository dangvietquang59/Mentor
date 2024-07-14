'use client';
import { useState, useEffect } from 'react';

const SliderImage = ({ images }: { images: string[] }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1,
                );
                setIsTransitioning(false);
            }, 500); // Thời gian chờ trước khi chuyển đổi hình ảnh mới
        }, 2000);

        return () => clearInterval(interval);
    }, [images]);

    const previousImage = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1,
            );
            setIsTransitioning(false);
        }, 500); // Thời gian chờ trước khi chuyển đổi hình ảnh mới
    };

    const nextImage = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1,
            );
            setIsTransitioning(false);
        }, 500); // Thời gian chờ trước khi chuyển đổi hình ảnh mới
    };

    return (
        <div className="relative h-[60rem]">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt="Slider Image"
                    className={`absolute left-0 top-0 h-full w-full object-cover ${
                        index === currentImageIndex
                            ? 'opacity-100'
                            : 'opacity-0'
                    } ${isTransitioning && 'transition-opacity'}`}
                />
            ))}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`mx-1 h-2 w-2 rounded-full ${
                            currentImageIndex === index
                                ? 'bg-gray-800'
                                : 'bg-gray-400'
                        }`}
                    ></span>
                ))}
            </div>
            <button
                onClick={previousImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded bg-gray-800 px-2 py-1 text-white"
            >
                Previous
            </button>
            <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded bg-gray-800 px-2 py-1 text-white"
            >
                Next
            </button>
        </div>
    );
};

export default SliderImage;
