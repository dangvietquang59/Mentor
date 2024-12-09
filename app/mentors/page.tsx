'use client';
import jobTitleApi from '@/apis/jobTitleApi';
import technologiesApi from '@/apis/technologiesApi';
import userApi from '@/apis/userApi';
import icons from '@/assets/icons';
import ButtonCustom from '@/components/ButtonCustom';
import InputComponent from '@/components/Input';
import MentorsProfile from '@/components/MentorsProfile';
import SelectComponent from '@/components/Select';
import { JobTitleType } from '@/types/response/jobTitle';
import { TechnologiesType } from '@/types/response/technologies';
import { UserType } from '@/types/user';
import { formValidation } from '@/utils/constants/formValidation';
import { Checkbox, CheckboxProps, Pagination, Slider } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import paths from '@/utils/constants/paths';
import SearchInput from '@/components/SearchInput';
import { IoCodeSlash } from 'react-icons/io5';
import { PiSubtitles } from 'react-icons/pi';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { useMounted } from '@/utils/hooks/useMounted';
interface FilterProps {
    experiencesYear: number;
    jobtitle: string[];
    technology: string[];
    search: string;
    rating: 'ASC' | 'DESC';
}

interface ParamsType {
    role: string;
    page: number;
    experiencesYear?: number;
    jobtitle?: string[];
    technology?: string[];
    rating?: 'ASC' | 'DESC';
    search?: string;
}

function Mentors() {
    const router = useRouter();
    const [query, setQuery] = useState<string>('');
    const [jobTitles, setJobTitles] = useState<JobTitleType[]>([]);
    const [technologies, setTechnologies] = useState<TechnologiesType[]>([]);
    const [mentors, setMentors] = useState<UserType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalUsers, setTotalUser] = useState<number>(0);
    const [currentPageTitleJob, setCurrentPageTitleJob] = useState<number>(1);
    const [currentPageTechnologies, setCurrebtTechnologies] =
        useState<number>(1);
    // const [totalPageJobtitle, setTotalPageJobTitle] = useState<number>(0);
    // const [totalPageTech, setTotalPageTech] = useState<number>(0);
    const [params, setParams] = useState<ParamsType>({
        role: 'Mentor',
        page: currentPage,
        search: '',
        rating: 'ASC',
        experiencesYear: undefined,
        jobtitle: [],
        technology: [],
    });
    const mounted = useMounted();
    // const {
    //     control,
    //     handleSubmit,
    //     reset,
    //     setValue,
    //     watch,
    //     formState: { errors },
    // } = useForm<FilterProps>();

    // const searchValue = watch('search');

    useEffect(() => {
        const fetchMentors = async () => {
            await userApi
                .getAll(params)
                .then((res) => {
                    if (res) {
                        setMentors(res?.users);
                        setCurrentPage(Number(res?.currentPage));
                        setTotalUser(res?.totalUsers);
                    }
                })
                .catch((error) => console.log(error));
        };
        fetchMentors();
    }, [params]);
    const fetchJobTitle = async () => {
        await jobTitleApi
            .getAll(currentPageTitleJob)
            .then((res) => {
                if (res) {
                    // setTotalPageJobTitle(res?.totalPages);
                    setJobTitles(res?.jobs);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fetchTechnologies = async () => {
        await technologiesApi
            .getAll(currentPageTechnologies)
            .then((res) => {
                if (res) {
                    // setTotalPageTech(res?.totalPages);
                    setTechnologies(res?.technologies);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchJobTitle();
        fetchTechnologies();
    }, [currentPageTechnologies, currentPageTitleJob]);
    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const [isTechnologiesOpen, setTechnologiesOpen] = useState(true);
    const [isJobTitlesOpen, setJobTitlesOpen] = useState(true);

    const handleToggleTechnologies = () => {
        setTechnologiesOpen(!isTechnologiesOpen);
    };
    const handleToggleJobTitles = () => {
        setJobTitlesOpen(!isJobTitlesOpen);
    };
    const handleReset = () => {
        setQuery('');
        // Reset any other filters if necessary
    };

    const handleSubmit = () => {
        // Handle form submission or filter apply logic
        console.log('Filters applied');
    };
    // const onSubmit = async (data: FilterProps) => {
    //     const newParams: ParamsType = {
    //         role: 'Mentor',
    //         page: 1,
    //         experiencesYear: data.experiencesYear || undefined,
    //         jobtitle: data.jobtitle.length > 0 ? data.jobtitle : undefined,
    //         technology:
    //             data.technology.length > 0 ? data.technology : undefined,
    //         search: data.search || undefined,
    //         rating: data.rating || undefined,
    //     };

    //     setParams(newParams);

    //     const queryParams = new URLSearchParams();

    //     if (data.experiencesYear) {
    //         queryParams.append(
    //             'experiencesYear',
    //             data.experiencesYear.toString(),
    //         );
    //     }

    //     if (data.jobtitle.length > 0) {
    //         queryParams.append('jobtitle', data.jobtitle.join(','));
    //     }

    //     if (data.technology.length > 0) {
    //         queryParams.append('technology', data.technology.join(','));
    //     }

    //     if (data.search) {
    //         queryParams.append('search', data.search);
    //     }

    //     if (data.rating) {
    //         queryParams.append('rating', data.rating);
    //     }

    //     router.push(`${paths.MENTORS}?${queryParams.toString()}`);
    // };

    // const clearSearch = () => {
    //     setValue('search', ''); // Clears the search field
    //     handleSubmit(onSubmit)(); // Resubmits the form with cleared search
    // };

    // useEffect(() => {
    //     const queryString = window.location.search;
    //     const urlParams = new URLSearchParams(queryString);

    //     reset({
    //         experiencesYear: Number(urlParams.get('experiencesYear')) || 0,
    //         jobtitle: urlParams.get('jobtitle')
    //             ? urlParams.get('jobtitle')?.split(',')
    //             : [],
    //         technology: urlParams.get('technology')
    //             ? urlParams.get('technology')?.split(',')
    //             : [],
    //         search: urlParams.get('search') || '',
    //         rating: (urlParams.get('rating') as 'ASC' | 'DESC') || undefined,
    //     });
    // }, [reset]);
    // const resetForm = () => {
    //     reset({
    //         search: '',
    //         rating: 'ASC',
    //         experiencesYear: undefined,
    //         jobtitle: [],
    //         technology: [],
    //     });
    // };
    // const handleScrollPopUpJobTitle = (e: React.UIEvent<HTMLDivElement>) => {
    //     if (e && e.currentTarget) {
    //         const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    //         if (
    //             scrollTop + clientHeight >= scrollHeight &&
    //             currentPageTitleJob < (totalPageJobtitle || 1)
    //         ) {
    //             setCurrentPageTitleJob((prevPage) => prevPage + 1);
    //         }
    //     }
    // };
    // const handleScrollPopUpTech = (e: React.UIEvent<HTMLDivElement>) => {
    //     if (e && e.currentTarget) {
    //         const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    //         if (
    //             scrollTop + clientHeight >= scrollHeight &&
    //             currentPageTechnologies < (totalPageTech || 1)
    //         ) {
    //             setCurrebtTechnologies((prevPage) => prevPage + 1);
    //         }
    //     }
    // };
    return (
        <>
            {mounted && (
                <div className="grid grid-cols-[20%_80%] bg-[#1A1A1A] py-[2rem]">
                    <div className="flex flex-col gap-[2.4rem] rounded-lg p-[1rem] shadow-lg">
                        <SearchInput setQuery={setQuery} query={query} />

                        <div className="flex flex-col gap-[0.8rem]">
                            <div className="flex flex-col gap-[1.2rem]">
                                <button
                                    onClick={handleToggleTechnologies}
                                    className="flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 px-4 py-3 hover:bg-[#444444]"
                                >
                                    <div className="flex items-center gap-[1rem]">
                                        <IoCodeSlash className="h-[2rem] w-[2rem] text-[#FFFFFF]" />
                                        <span className="text-[1.6rem] text-[#F0F0F0]">
                                            Công nghệ sử dụng
                                        </span>
                                    </div>
                                    <IoChevronUp
                                        className={`h-[2rem] w-[2rem] text-[#F0F0F0] transition-transform duration-300 ${isTechnologiesOpen ? 'rotate-180' : 'rotate-0'}`}
                                    />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        isTechnologiesOpen
                                            ? 'max-h-[500px]'
                                            : 'max-h-0'
                                    }`}
                                >
                                    <div className="grid max-h-[200px] grid-cols-2 gap-[0.4rem] overflow-y-auto">
                                        {technologies?.length > 0 &&
                                            technologies.map((item, index) => (
                                                <Checkbox
                                                    key={index}
                                                    onChange={onChange}
                                                    className=" text-white [&_.ant-checkbox-inner]:bg-transparent"
                                                >
                                                    {item?.name}
                                                </Checkbox>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={handleToggleJobTitles}
                                    className="flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 px-4 py-3 hover:bg-[#444444]"
                                >
                                    <div className="flex items-center gap-[1rem]">
                                        <PiSubtitles className="h-[2rem] w-[2rem] text-[#FFFFFF]" />
                                        <span className="text-[1.6rem] text-[#F0F0F0]">
                                            Chức danh
                                        </span>
                                    </div>
                                    <IoChevronUp
                                        className={`h-[2rem] w-[2rem] text-[#F0F0F0] transition-transform duration-300 ${isJobTitlesOpen ? 'rotate-180' : 'rotate-0'}`}
                                    />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        isJobTitlesOpen
                                            ? 'max-h-[500px]'
                                            : 'max-h-0'
                                    }`}
                                >
                                    <div className="flex max-h-[200px] flex-col gap-[0.4rem] overflow-y-auto">
                                        {jobTitles?.length > 0 &&
                                            jobTitles.map((item, index) => (
                                                <Checkbox
                                                    key={index}
                                                    onChange={onChange}
                                                    className="text-white [&_.ant-checkbox-inner]:bg-transparent"
                                                >
                                                    {item?.name}
                                                </Checkbox>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[1rem]">
                            <span className="text-[1.4rem] text-[#F0F0F0]">
                                Năm kinh nghiệm
                            </span>
                            <Slider
                                defaultValue={30}
                                tooltip={{ open: true }}
                                className="flex-grow"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-[1rem]">
                            <ButtonCustom onClick={handleReset} outline>
                                Đặt lại
                            </ButtonCustom>
                            <ButtonCustom onClick={handleSubmit}>
                                Lọc
                            </ButtonCustom>
                        </div>
                    </div>
                    <div className="p-[1rem]">
                        {mentors?.length > 0 ? (
                            <>
                                <ul className="grid grid-cols-1 gap-[1.6rem] md:grid-cols-2 lg:grid-cols-4">
                                    {mentors.map((mentor, index) => (
                                        <li key={index}>
                                            <MentorsProfile mentor={mentor} />
                                        </li>
                                    ))}
                                </ul>

                                <Pagination
                                    defaultCurrent={currentPage}
                                    total={totalUsers}
                                    pageSize={12}
                                    align="center"
                                    onChange={(page) => setCurrentPage(page)}
                                />
                            </>
                        ) : (
                            <div className="flex h-[40rem] items-center justify-center">
                                <p className="text-[2.4rem] font-bold">
                                    Không có cố vấn nào phù hợp
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Mentors;
