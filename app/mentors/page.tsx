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
import { Pagination } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import paths from '@/utils/constants/paths';

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
    const [jobTitles, setJobTitles] = useState<JobTitleType[]>([]);
    const [technologies, setTechnologies] = useState<TechnologiesType[]>([]);
    const [mentors, setMentors] = useState<UserType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalUsers, setTotalUser] = useState<number>(0);
    const [params, setParams] = useState<ParamsType>({
        role: 'Mentor',
        page: currentPage,
        search: '',
        rating: 'ASC',
        experiencesYear: undefined,
        jobtitle: [],
        technology: [],
    });

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FilterProps>();

    const searchValue = watch('search');

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

    useEffect(() => {
        const fetchJobTitle = async () => {
            await jobTitleApi
                .getAll()
                .then((res) => {
                    if (res) {
                        setJobTitles(res?.jobs);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchJobTitle();
    }, []);

    useEffect(() => {
        const fetchTechnologies = async () => {
            await technologiesApi
                .getAll()
                .then((res) => {
                    if (res) {
                        setTechnologies(res?.technologies);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchTechnologies();
    }, []);

    const onSubmit = async (data: FilterProps) => {
        const newParams: ParamsType = {
            role: 'Mentor',
            page: 1,
            experiencesYear: data.experiencesYear || undefined,
            jobtitle: data.jobtitle.length > 0 ? data.jobtitle : undefined,
            technology:
                data.technology.length > 0 ? data.technology : undefined,
            search: data.search || undefined,
            rating: data.rating || undefined,
        };

        setParams(newParams);

        const queryParams = new URLSearchParams();

        if (data.experiencesYear) {
            queryParams.append(
                'experiencesYear',
                data.experiencesYear.toString(),
            );
        }

        if (data.jobtitle.length > 0) {
            queryParams.append('jobtitle', data.jobtitle.join(','));
        }

        if (data.technology.length > 0) {
            queryParams.append('technology', data.technology.join(','));
        }

        if (data.search) {
            queryParams.append('search', data.search);
        }

        if (data.rating) {
            queryParams.append('rating', data.rating);
        }

        router.push(`${paths.MENTORS}?${queryParams.toString()}`);
    };

    const clearSearch = () => {
        setValue('search', ''); // Clears the search field
        handleSubmit(onSubmit)(); // Resubmits the form with cleared search
    };

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        reset({
            experiencesYear: Number(urlParams.get('experiencesYear')) || 0,
            jobtitle: urlParams.get('jobtitle')
                ? urlParams.get('jobtitle')?.split(',')
                : [],
            technology: urlParams.get('technology')
                ? urlParams.get('technology')?.split(',')
                : [],
            search: urlParams.get('search') || '',
            rating: (urlParams.get('rating') as 'ASC' | 'DESC') || undefined,
        });
    }, [reset]);

    return (
        <div className="flex flex-col gap-[4.8rem] bg-[#1A1A1A] px-[5%] py-[2rem]">
            <div className="flex w-full items-center justify-between">
                <div className="flex w-full items-center gap-[1.6rem]">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex w-full flex-col gap-[1.2rem] rounded-[0.8rem] bg-[#242424] p-[2rem] shadow-lg"
                    >
                        <div className="flex items-center gap-[1.2rem]">
                            <div className="flex h-[5.2rem] w-full flex-1 items-center gap-[0.8rem] rounded-[0.8rem] bg-[#1A1A1A] px-[1rem]">
                                <Image
                                    src={icons.search}
                                    alt="icon"
                                    width={20}
                                />
                                <input
                                    placeholder="Search mentor"
                                    className="h-full flex-1 bg-transparent text-[1.4rem] placeholder:text-[#f1f1f1] focus:outline-none"
                                    {...control.register('search')}
                                />
                                {searchValue && (
                                    <button type="button" onClick={clearSearch}>
                                        <Image
                                            src={icons.xCircle}
                                            alt="clear search"
                                            width={20}
                                        />
                                    </button>
                                )}
                            </div>
                            <ButtonCustom
                                type="submit"
                                outline
                                className="w-[20rem]"
                            >
                                Submit
                            </ButtonCustom>
                        </div>
                        <div className="grid grid-cols-4 gap-[1.2rem]">
                            <InputComponent
                                control={control}
                                name="experiencesYear"
                                label="Experience years"
                                placeholder="Experience years"
                                type="number"
                                rules={{
                                    ...formValidation.date,
                                    required: false,
                                }}
                            />
                            <SelectComponent
                                name="jobtitle"
                                control={control}
                                label="Job titles"
                                options={
                                    jobTitles &&
                                    jobTitles.map((item) => ({
                                        label: item?.name,
                                        value: item?._id,
                                    }))
                                }
                                mode="multiple"
                                rules={{
                                    ...formValidation.technologies,
                                    required: false,
                                }}
                            />
                            <SelectComponent
                                name="technology"
                                control={control}
                                label="Technologies"
                                options={
                                    technologies &&
                                    technologies.map((item) => ({
                                        label: item?.name,
                                        value: item?._id,
                                    }))
                                }
                                mode="multiple"
                                rules={{
                                    ...formValidation.technologies,
                                    required: false,
                                }}
                            />
                            <SelectComponent
                                name="rating"
                                label="Filter by rating"
                                control={control}
                                options={[
                                    {
                                        label: 'Filter by rating point',
                                        value: '',
                                    },
                                    { label: 'Descend', value: 'DESC' },
                                    { label: 'Ascend', value: 'ASC' },
                                ]}
                                defaultValue={'Filter by rating point'}
                                className="w-full"
                            />
                        </div>
                    </form>
                </div>
            </div>
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
                        No suitable mentors were found
                    </p>
                </div>
            )}
        </div>
    );
}

export default Mentors;
