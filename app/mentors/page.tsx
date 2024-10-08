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
import { Pagination, Popover } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface FilterProps {
    experiencesYear: number;
    jobtitle: string[];
    technology: string[];
}

// Define the ParamsType interface
interface ParamsType {
    role: string; // Role of the user
    page: number; // Current page number
    experiencesYear?: number; // Years of experience (optional)
    jobtitle?: string[]; // Array of job titles (optional)
    technology?: string[]; // Array of technology IDs (optional)
    rating?: 'ASC' | 'DESC'; // Sort by rating (ascending or descending)
    search?: string; // Add search keyword
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
        experiencesYear: undefined,
        jobtitle: [],
        technology: [],
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FilterProps>();

    // Fetch mentors based on currentPage and params
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

    // Fetch job titles
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

    // Fetch technologies
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

    // On form submit
    const onSubmit = async (data: FilterProps) => {
        console.log('Submitted Data:', data);

        // Cập nhật params với tiêu chí lọc mới
        const newParams: ParamsType = {
            role: 'Mentor',
            page: 1,
            experiencesYear: data.experiencesYear || undefined,
            jobtitle: data.jobtitle.length > 0 ? data.jobtitle : undefined,
            technology:
                data.technology.length > 0 ? data.technology : undefined,
        };

        setParams(newParams);

        // Tạo một đối tượng rỗng để chứa các tham số truy vấn
        const queryParams = new URLSearchParams();

        // Chỉ thêm tham số vào queryParams nếu có giá trị hợp lệ
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

        // Cập nhật URL với các tham số truy vấn
        router.push(`/mentors?${queryParams.toString()}`);
    };

    // On component mount, set form data from URL params
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
        });
    }, [reset]);

    const content = (
        <div className="flex min-h-[30rem] gap-[2.4rem] p-[1rem]">
            <div className="flex flex-col gap-[2.4rem]">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex w-full flex-col gap-[2.4rem]"
                >
                    <InputComponent
                        control={control}
                        name="experiencesYear"
                        label="Experience years"
                        placeholder="Experience years"
                        type="number"
                        rules={{
                            ...formValidation.date,
                            // Cho phép trường này không có giá trị
                            required: false, // Hoặc bạn có thể xóa completely nếu không cần validation
                        }}
                        className="w-[50rem]"
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
                            // Cho phép trường này không có giá trị
                            required: false,
                        }}
                        className="w-[50rem]"
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
                            // Cho phép trường này không có giá trị
                            required: false,
                        }}
                        className="w-[50rem]"
                    />
                    <div className="grid grid-cols-2 gap-[1.2rem]">
                        <ButtonCustom type="submit">Submit</ButtonCustom>
                        <ButtonCustom
                            type="button"
                            outline
                            onClick={() =>
                                reset({
                                    experiencesYear: 0,
                                    jobtitle: [],
                                    technology: [],
                                })
                            }
                        >
                            Clear
                        </ButtonCustom>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div className="my-[3%] flex flex-col gap-[4.8rem] md:mx-[10%]">
            <div className="flex items-center justify-between">
                <Popover
                    content={content}
                    trigger="click"
                    placement="bottomLeft"
                >
                    <div className="flex h-[4.2rem] cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] bg-[#1A1A1A] px-[1rem]">
                        <p className="text-[2rem] font-medium">Filter</p>
                        <Image src={icons.chevronDown} alt="icon" width={20} />
                    </div>
                </Popover>

                <div className="flex items-center gap-[1.6rem]">
                    <div className="flex h-[4.2rem] w-[30rem] items-center gap-[0.8rem] rounded-[0.8rem] bg-[#1A1A1A] px-[1rem]">
                        <Image src={icons.search} alt="icon" width={20} />
                        <input
                            placeholder="search mentor"
                            className="h-full bg-transparent text-[1.4rem] placeholder:text-[#f1f1f1] focus-within:outline-none"
                        />
                    </div>
                    <SelectComponent
                        name="technology"
                        options={[
                            { label: 'Filter by rating point', value: '' },
                            { label: 'Descend', value: 'DESC' },
                            { label: 'Ascend', value: 'ASC' },
                        ]}
                        defaultValue={'Filter by rating point'}
                        className="w-[40rem]"
                        style={{ width: 200 }}
                    />
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
