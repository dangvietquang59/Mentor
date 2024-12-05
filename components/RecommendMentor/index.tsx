'use client';

import { UserType } from '@/types/user';
import PreviewMentor from '../PreviewMentor';
import { useEffect, useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import userApi from '@/apis/userApi';
import Image from 'next/image';

function RecommendMentor() {
    const [swiperKey, setSwiperKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [mentors, setMentors] = useState<UserType[]>([]);

    useEffect(() => {
        setSwiperKey((prevKey) => prevKey + 1);
    }, []);

    const params = {
        page: 1,
        role: 'Mentor',
    };

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const res = await userApi.getAll(params);
                if (res) {
                    setMentors(res?.users);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Tạo mảng mentors sao cho luôn có ít nhất 10 phần tử
    const mentorsToShow =
        mentors.length < 10
            ? [
                  ...mentors,
                  ...Array(10 - mentors.length)
                      .fill(mentors)
                      .flat(),
              ]
            : mentors;

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="my-[1rem] text-[3.6rem] font-bold">
                    Đề xuất cho bạn
                </h2>
            </div>
            <div>
                <Swiper
                    key={swiperKey}
                    slidesPerView={'auto'}
                    loop={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    breakpoints={{
                        '375': {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        '768': {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        '1024': {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                    }}
                    speed={5000}
                    className="swiper-partner"
                >
                    {isLoading
                        ? Array.from({ length: 10 }).map((_, index) => (
                              <SwiperSlide key={index}>
                                  <p>Loading</p>
                              </SwiperSlide>
                          ))
                        : mentorsToShow.map((user, index) => (
                              <SwiperSlide key={index}>
                                  <PreviewMentor user={user} />
                              </SwiperSlide>
                          ))}
                </Swiper>
            </div>
        </>
    );
}

export default RecommendMentor;
