import { useRef, useState, useEffect } from 'react';

interface UseScrollProps {
    scrollAmount: number;
}

const useScroll = ({ scrollAmount }: UseScrollProps) => {
    const mentorListContainerRef = useRef<HTMLDivElement>(null);
    let animationFrameId: number | null = null;

    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    useEffect(() => {
        const container = mentorListContainerRef.current;
        if (!container) return;

        const handleScrollUpdate = () => {
            setIsAtStart(container.scrollLeft === 0);
            setIsAtEnd(
                Math.round(container.scrollLeft + container.clientWidth) ===
                    container.scrollWidth,
            );
            console.log(
                'a',
                Math.round(container.scrollLeft + container.clientWidth) + 1,
            );
            console.log('b', container.scrollWidth);
        };

        container.addEventListener('scroll', handleScrollUpdate);
        return () => {
            container.removeEventListener('scroll', handleScrollUpdate);
        };
    }, []);

    const smoothScroll = (
        startTime: number,
        endTime: number,
        startScroll: number,
        targetScroll: number,
    ) => {
        const duration = endTime - startTime;
        const currentTime = Math.min(Date.now(), endTime);
        const progress = (currentTime - startTime) / duration;

        const easedProgress = easeOutQuart(progress);
        const newScroll =
            startScroll + (targetScroll - startScroll) * easedProgress;

        mentorListContainerRef.current!.scrollLeft = newScroll;

        if (currentTime < endTime) {
            animationFrameId = requestAnimationFrame(() => {
                smoothScroll(startTime, endTime, startScroll, targetScroll);
            });
        }
    };

    const handleScroll = (direction: 'left' | 'right') => {
        if (!mentorListContainerRef.current) return;

        const container = mentorListContainerRef.current;
        const startScroll = container.scrollLeft;
        const targetScroll =
            direction === 'right'
                ? startScroll + scrollAmount
                : startScroll - scrollAmount;
        const startTime = Date.now();
        const endTime = startTime + 100;

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
            smoothScroll(startTime, endTime, startScroll, targetScroll);
        });
    };

    const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4); // You can experiment with different easing functions here

    return { mentorListContainerRef, handleScroll, isAtStart, isAtEnd };
};

export default useScroll;
