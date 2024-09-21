'use client';
import userApi from '@/apis/userApi';
import icons from '@/assets/icons';
import MentorsProfile from '@/components/MentorsProfile';
import SelectComponent from '@/components/Select';
import { UserType } from '@/types/user';
import { Pagination, Popover } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Mentors() {
    const jobTitles = [
        { label: 'Software Engineer', value: 'software_engineer' },
        { label: 'Frontend Developer', value: 'frontend_developer' },
        { label: 'Backend Developer', value: 'backend_developer' },
        { label: 'Full Stack Developer', value: 'full_stack_developer' },
        { label: 'Mobile Developer', value: 'mobile_developer' },
        { label: 'DevOps Engineer', value: 'devops_engineer' },
        { label: 'Cloud Engineer', value: 'cloud_engineer' },
        { label: 'Data Scientist', value: 'data_scientist' },
        { label: 'Data Engineer', value: 'data_engineer' },
        {
            label: 'Machine Learning Engineer',
            value: 'machine_learning_engineer',
        },
        { label: 'AI Engineer', value: 'ai_engineer' },
        { label: 'System Administrator', value: 'system_administrator' },
        { label: 'Network Engineer', value: 'network_engineer' },
        {
            label: 'Cybersecurity Specialist',
            value: 'cybersecurity_specialist',
        },
        { label: 'Database Administrator', value: 'database_administrator' },
        { label: 'Quality Assurance (QA) Engineer', value: 'qa_engineer' },
        { label: 'Product Manager', value: 'product_manager' },
        { label: 'Scrum Master', value: 'scrum_master' },
        { label: 'UI/UX Designer', value: 'ui_ux_designer' },
        { label: 'Business Analyst', value: 'business_analyst' },
        { label: 'Solutions Architect', value: 'solutions_architect' },
        {
            label: 'Technical Support Engineer',
            value: 'technical_support_engineer',
        },
        { label: 'IT Project Manager', value: 'it_project_manager' },
        { label: 'Blockchain Developer', value: 'blockchain_developer' },
        { label: 'IT Consultant', value: 'it_consultant' },
        { label: 'Security Analyst', value: 'security_analyst' },
        { label: 'Infrastructure Engineer', value: 'infrastructure_engineer' },
        { label: 'Cloud Architect', value: 'cloud_architect' },
        { label: 'Software Architect', value: 'software_architect' },
        { label: 'Technical Lead', value: 'technical_lead' },
    ];
    const arrayExperienceYears = [
        {
            label: '< 5 years',
            from: 1,
            to: 4,
        },
        {
            label: 'from 5 to 10 years',
            from: 5,
            to: 9,
        },
        {
            label: '> 10 years',
            from: 10,
            to: 100,
        },
    ];
    const content = (
        <div className="flex h-[30rem] w-[80rem] gap-[2.4rem] p-[1rem]">
            <div className="flex flex-col gap-[2.4rem]">
                <p className="text-nowrap text-[1.8rem] font-medium text-white">
                    Experience years
                </p>
                <p className="text-[1.8rem] font-medium text-white">
                    Job title
                </p>
                <p className="text-[1.8rem] font-medium text-white">
                    Technologies
                </p>
            </div>
            <div className="flex flex-col gap-[2.4rem]">
                <ul className="flex items-center gap-[1.6rem]">
                    {arrayExperienceYears.map((item, index) => (
                        <li
                            key={index}
                            className="cursor-pointer rounded-[0.8rem] border p-[0.5rem] text-[1.4rem] text-white"
                        >
                            {item?.label}
                        </li>
                    ))}
                </ul>
                <SelectComponent
                    name="jobTitle"
                    options={jobTitles}
                    mode="multiple"
                    placeholder="Chọn chức danh công việc"
                />
                <SelectComponent
                    name="jobTitle"
                    options={jobTitles}
                    mode="multiple"
                    placeholder="Chọn chức danh công việc"
                />
            </div>
        </div>
    );
    const [mentors, setMentors] = useState<UserType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalUsers, setTotalUser] = useState<number>(0);
    const params = {
        role: 'Mentor',
        page: currentPage,
    };

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
    }, [currentPage]);
    return (
        <div className="my-[3%] flex flex-col gap-[4.8rem] md:mx-[10%]">
            <div className="flex items-center justify-between">
                <Popover
                    content={content}
                    trigger="hover"
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
                            {
                                label: 'Descend',
                                value: 'des',
                            },
                            {
                                label: 'Acsend',
                                value: 'acs',
                            },
                            {
                                label: 'All',
                                value: '',
                            },
                        ]}
                        defaultValue={'Filter by experiences'}
                        className="w-[40rem]"
                        style={{
                            width: 300,
                        }}
                    />
                </div>
            </div>
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
        </div>
    );
}

export default Mentors;
