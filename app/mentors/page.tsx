'use client';
import debounce from 'lodash.debounce';
import jobTitleApi from '@/apis/jobTitleApi';
import technologiesApi from '@/apis/technologiesApi';
import userApi from '@/apis/userApi';
import ButtonCustom from '@/components/ButtonCustom';
import MentorsProfile from '@/components/MentorsProfile';
import { JobTitleType } from '@/types/response/jobTitle';
import { TechnologiesType } from '@/types/response/technologies';
import { UserType } from '@/types/user';
import { Checkbox, GetProp, InputNumber, Pagination, Slider, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchInput from '@/components/SearchInput';
import { IoCodeSlash } from 'react-icons/io5';
import { PiSubtitles } from 'react-icons/pi';
import { IoChevronUp } from 'react-icons/io5';
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
    const [jobTitles, setJobTitles] = useState<JobTitleType[]>([]);
    const [technologies, setTechnologies] = useState<TechnologiesType[]>([]);
    const [mentors, setMentors] = useState<UserType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalUsers, setTotalUser] = useState<number>(0);
    const [currentPageTitleJob, setCurrentPageTitleJob] = useState<number>(1);
    const [currentPageTechnologies, setCurrentPageTechnologies] =
        useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [sliderValue, setSliderValue] = useState<[number, number]>([0, 100]);

    // State for filters
    const [listCheckbox, setListCheckBox] = useState<string[]>([]);
    const [filters, setFilters] = useState<FilterProps>({
        experiencesYear: 0,
        jobtitle: [],
        technology: [],
        search: '',
        rating: 'ASC',
    });

    const mounted = useMounted();

    const params: ParamsType = {
        role: 'Mentor',
        page: currentPage,
        search: filters.search,
        rating: filters.rating,
        experiencesYear: filters.experiencesYear || undefined,
        jobtitle: filters.jobtitle.length > 0 ? filters.jobtitle : undefined,
        technology:
            filters.technology.length > 0 ? filters.technology : undefined,
    };

    useEffect(() => {
        const fetchMentors = async () => {
            setLoading(true);

            await userApi
                .getAll(params)
                .then((res) => {
                    if (res) {
                        setLoading(false);
                        setMentors(res?.users);
                        setCurrentPage(Number(res?.currentPage));
                        setTotalUser(res?.totalUsers);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(true);
                });
        };
        fetchMentors();
    }, [filters, currentPage]);

    const fetchJobTitle = async () => {
        await jobTitleApi
            .getAll(currentPageTitleJob)
            .then((res) => {
                if (res) {
                    setJobTitles((prev) => [...prev, ...res?.jobs]);
                }
            })
            .catch((error) => console.log(error));
    };

    const fetchTechnologies = async () => {
        await technologiesApi
            .getAll(currentPageTechnologies)
            .then((res) => {
                if (res) {
                    setTechnologies((prev) => [...prev, ...res?.technologies]);
                }
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        fetchTechnologies();
    }, [currentPageTechnologies]);

    useEffect(() => {
        fetchJobTitle();
    }, [currentPageTitleJob]);

    const [isTechnologiesOpen, setTechnologiesOpen] = useState(true);
    const [isJobTitlesOpen, setJobTitlesOpen] = useState(true);

    const handleToggleTechnologies = () => {
        setTechnologiesOpen(!isTechnologiesOpen);
    };

    const handleToggleJobTitles = () => {
        setJobTitlesOpen(!isJobTitlesOpen);
    };

    const debouncedSliderChange = debounce((value: number | number[]) => {
        if (Array.isArray(value)) {
            setSliderValue(value as [number, number]);
            setFilters((prev) => ({
                ...prev,
                experiencesYear: value[0],
            }));
        } else {
            setSliderValue([value, sliderValue[0]]);
            setFilters((prev) => ({
                ...prev,
                experiencesYear: value,
            }));
        }
    }, 500);

    const debouncedSearchChange = (value: string) => {
        setFilters((prev) => ({
            ...prev,
            search: value,
        }));
    };

    const handleCheckboxChange = (e: any, type: 'jobtitle' | 'technology') => {
        const value = e.target.name;
        const checked = e.target.checked;

        setListCheckBox((prevList) => {
            let updatedList;
            if (checked) {
                updatedList = [...prevList, value];
            } else {
                updatedList = prevList.filter((item) => item !== value);
            }

            setFilters((prevFilters) => ({
                ...prevFilters,
                [type]: updatedList,
            }));

            return updatedList;
        });
    };

    const clearFilters = () => {
        setListCheckBox([]);
        setFilters({
            experiencesYear: 0,
            jobtitle: [],
            technology: [],
            search: '',
            rating: 'ASC',
        });
        setSliderValue([0, 100]);
        setCurrentPage(1);
    };

    return (
        <>
            {mounted && (
                <div className="grid grid-cols-[20%_80%] bg-[#1A1A1A] py-[2rem]">
                    <div className="flex flex-col gap-[2.4rem] rounded-lg p-[1rem] shadow-lg">
                        <SearchInput
                            setQuery={debouncedSearchChange} // Debounced search input
                            query={filters.search}
                        />

                        <div className="flex flex-col gap-[0.8rem]">
                            <div className="flex flex-col gap-[1.2rem]">
                                <button
                                    onClick={handleToggleTechnologies}
                                    className="flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 px-4 py-3 hover:bg-[#444444]"
                                >
                                    <div className="flex items-center gap-[1rem]">
                                        <IoCodeSlash className="h-[2rem] w-[2rem] text-[#FFFFFF]" />
                                        <span className="text-[1.6rem] text-[#F0F0F0]">
                                            Công nghệ
                                        </span>
                                    </div>
                                    <IoChevronUp
                                        className={`h-[2rem] w-[2rem] text-[#F0F0F0] transition-transform duration-300 ${isTechnologiesOpen ? 'rotate-180' : 'rotate-0'}`}
                                    />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isTechnologiesOpen ? 'max-h-[50rem]' : 'max-h-0'}`}
                                >
                                    <div className="grid max-h-[20rem] grid-cols-2 gap-[0.4rem] overflow-y-auto">
                                        {technologies?.length > 0 &&
                                            technologies.map((item, index) => (
                                                <Checkbox
                                                    key={index}
                                                    checked={listCheckbox.includes(
                                                        item._id,
                                                    )}
                                                    onChange={(e) =>
                                                        handleCheckboxChange(
                                                            e,
                                                            'technology',
                                                        )
                                                    }
                                                    name={item._id}
                                                    className="text-white [&_.ant-checkbox-inner]:bg-transparent"
                                                >
                                                    {item.name}
                                                </Checkbox>
                                            ))}
                                    </div>
                                    <button
                                        className="mt-[1rem] flex w-full items-center justify-center text-[1.4rem]"
                                        onClick={() =>
                                            setCurrentPageTechnologies(
                                                currentPageTechnologies + 1,
                                            )
                                        }
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-[1.2rem]">
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
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isJobTitlesOpen ? 'max-h-[50rem]' : 'max-h-0'}`}
                                >
                                    <div className="flex max-h-[20rem] flex-col gap-[0.4rem] overflow-y-auto">
                                        {jobTitles?.length > 0 &&
                                            jobTitles.map((item, index) => (
                                                <Checkbox
                                                    key={index}
                                                    checked={listCheckbox.includes(
                                                        item._id,
                                                    )}
                                                    onChange={(e) =>
                                                        handleCheckboxChange(
                                                            e,
                                                            'jobtitle',
                                                        )
                                                    }
                                                    name={item._id}
                                                    className="text-white [&_.ant-checkbox-inner]:bg-transparent"
                                                >
                                                    {item.name}
                                                </Checkbox>
                                            ))}
                                    </div>
                                    <button
                                        className="mt-[1rem] flex w-full items-center justify-center text-[1.4rem]"
                                        onClick={() =>
                                            setCurrentPageTitleJob(
                                                currentPageTitleJob + 1,
                                            )
                                        }
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[1rem]">
                                <div className="flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 px-4 py-3 hover:bg-[#444444]">
                                    <span className="text-[1.6rem] text-[#F0F0F0]">
                                        Số năm kinh nghiệm
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 items-center gap-[1.2rem]">
                                    <InputNumber
                                        value={sliderValue[0]}
                                        className="w-full !text-white"
                                        disabled
                                    />
                                    <InputNumber
                                        value={sliderValue[1]}
                                        className="w-full !text-white"
                                        disabled
                                    />
                                </div>
                                <Slider
                                    range
                                    step={1}
                                    defaultValue={sliderValue}
                                    onChange={debouncedSliderChange} // Debounced slider change
                                />
                            </div>

                            <ButtonCustom
                                onClick={clearFilters}
                                type="button"
                                outline
                            >
                                Xóa bộ lọc
                            </ButtonCustom>
                        </div>
                    </div>

                    <div className="p-[1rem]">
                        {mentors?.length > 0 ? (
                            <>
                                {!loading ? (
                                    <ul className="grid grid-cols-1 gap-[1.6rem] md:grid-cols-2 lg:grid-cols-4">
                                        {mentors.map((mentor, index) => (
                                            <li key={index}>
                                                <MentorsProfile
                                                    mentor={mentor}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <Spin />
                                    </div>
                                )}

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
