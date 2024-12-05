import React from 'react';
import Image from 'next/image';
import images from '@/assets/img';
import OverviewBlog from '@/components/OverviewBlog';
import Devider from '@/components/Devider';
import Introduce from '@/components/Introduce';
import ReviewMentee from '@/components/ReviewMentee';
import Articles from '@/components/Articles';
import RecommendMentor from '@/components/RecommendMentor';

const Home = () => {
    return (
        <>
            <div className="overflow-hidden">
                <div className="relative">
                    <Image
                        src={images.banner}
                        alt="background"
                        className="h-[65rem] w-full object-cover"
                    />
                </div>

                <div className="mt-[2.4rem] flex flex-col gap-[3.2rem] px-[8%]">
                    <RecommendMentor />
                    <Devider />

                    <div>
                        <OverviewBlog />
                    </div>
                    <div className="mt-[2.4rem]">
                        <Articles />
                    </div>
                    <div>
                        <Introduce />
                    </div>
                    <Devider />
                    <div className="my-[3rem]">
                        <h2 className="mb-[4rem] text-[3.6rem] font-medium">
                            Phản hồi từ học viên
                        </h2>
                        <div className="grid grid-cols-3 gap-[1rem]">
                            <ReviewMentee />
                            <ReviewMentee />
                            <ReviewMentee />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;
