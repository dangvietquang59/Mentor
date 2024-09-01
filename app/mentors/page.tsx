'use client';
import icons from '@/assets/icons';
import MentorsProfile from '@/components/MentorsProfile';
import SelectComponent from '@/components/Select';
import { Pagination, Popover } from 'antd';
import Image from 'next/image';

function Mentors() {
    const mentors = [
        {
            _id: '66d353c108ac9d20fd4ff448',
            email: 'dvquang@gmail.com',
            password:
                '$2a$10$P7zMVhOv8pDfeWk0YMyjwOw5SVV.Dc2sLGRNavHjRf8yFtrjuOO96',
            fullName: 'Đặng Việt Quang',
            role: 'Mentor',
            bio: 'Frontend Developer',
            rating: '5.0',
            imageUrl:
                'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQOi1nsNXOQ41sNW1uK_Aft6kYZydfsCU7xEP38sA298BWc3shR',
            technologies: [
                {
                    technology: {
                        _id: '66d161482ee12770ff77b339',
                        name: 'Express.js',
                    },
                    experienceYears: 2,
                    _id: '66d3d8060bdc7125345769b2',
                },
                {
                    technology: {
                        _id: '66d161482ee12770ff77b33a',
                        name: 'Angular',
                    },
                    experienceYears: 4,
                    _id: '66d3d8060bdc7125345769b3',
                },
            ],
            createdAt: '2024-08-31T17:32:49.439Z',
            updatedAt: '2024-09-01T02:59:59.541Z',
            __v: 0,
            slug: 'dang-viet-quang',
        },
        {
            _id: '66d353c108ac9d20fd4ff449',
            email: 'mtlanh@gmail.com',
            password:
                '$2a$10$ABC12Z9yFjkOxpL5.yK8c.m6zjb.xpa3VGyODVb4f34uEOXJRSJe2',
            fullName: 'Mai Tùng Lanh',
            role: 'Mentor',
            bio: 'Full Stack Developer',
            rating: '4.8',
            imageUrl:
                'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQOi1nsNXOQ41sNW1uK_Aft6kYZydfsCU7xEP38sA298BWc3shR',
            technologies: [
                {
                    technology: {
                        _id: '66d161482ee12770ff77b340',
                        name: 'React.js',
                    },
                    experienceYears: 3,
                    _id: '66d3d8060bdc7125345769b4',
                },
                {
                    technology: {
                        _id: '66d161482ee12770ff77b341',
                        name: 'Node.js',
                    },
                    experienceYears: 5,
                    _id: '66d3d8060bdc7125345769b5',
                },
            ],
            createdAt: '2024-08-31T17:40:49.439Z',
            updatedAt: '2024-09-01T03:10:59.541Z',
            __v: 0,
            slug: 'mai-tung-lanh',
        },
        {
            _id: '66d353c108ac9d20fd4ff450',
            email: 'hnhoang@gmail.com',
            password:
                '$2a$10$7K9DS3cvwLXj.P6x0YTZCu.5SVY.QzJ9Vz2lHKFs9R.AecwFSgeSS',
            fullName: 'Hồ Nam Hoàng',
            role: 'Mentor',
            bio: 'Senior Frontend Developer',
            rating: '4.9',
            imageUrl:
                'https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/456717372_1502052240679006_8715417935453666269_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE2LxWJ0wRCJeT2wTEM4Kh8Ycx2SRbEDmVhzHZJFsQOZeDdJ2sCY9P1nw3n0Tvn-elQhrLNSuWOeF_x5mlwlr2E&_nc_ohc=WzWu-zHT9p4Q7kNvgFDR75V&_nc_ht=scontent.fsgn21-1.fna&oh=00_AYBKhhIiE1okz7JzoqPO3LuE6FufY_3KAO91khClE6tiYA&oe=66D9E191',
            technologies: [
                {
                    technology: {
                        _id: '66d161482ee12770ff77b342',
                        name: 'Vue.js',
                    },
                    experienceYears: 4,
                    _id: '66d3d8060bdc7125345769b6',
                },
                {
                    technology: {
                        _id: '66d161482ee12770ff77b343',
                        name: 'JavaScript',
                    },
                    experienceYears: 6,
                    _id: '66d3d8060bdc7125345769b7',
                },
            ],
            createdAt: '2024-08-31T17:45:49.439Z',
            updatedAt: '2024-09-01T03:20:59.541Z',
            __v: 0,
            slug: 'ho-nam-hoang',
        },
        {
            _id: '66d353c108ac9d20fd4ff448',
            email: 'dvquang@gmail.com',
            password:
                '$2a$10$P7zMVhOv8pDfeWk0YMyjwOw5SVV.Dc2sLGRNavHjRf8yFtrjuOO96',
            fullName: 'Đặng Việt Quang',
            role: 'Mentor',
            bio: 'Frontend Developer',
            rating: '5.0',
            imageUrl:
                'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQOi1nsNXOQ41sNW1uK_Aft6kYZydfsCU7xEP38sA298BWc3shR',
            technologies: [
                {
                    technology: {
                        _id: '66d161482ee12770ff77b339',
                        name: 'Express.js',
                    },
                    experienceYears: 2,
                    _id: '66d3d8060bdc7125345769b2',
                },
                {
                    technology: {
                        _id: '66d161482ee12770ff77b33a',
                        name: 'Angular',
                    },
                    experienceYears: 4,
                    _id: '66d3d8060bdc7125345769b3',
                },
            ],
            createdAt: '2024-08-31T17:32:49.439Z',
            updatedAt: '2024-09-01T02:59:59.541Z',
            __v: 0,
            slug: 'dang-viet-quang',
        },
    ];
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
            <div className="flex items-center justify-center">
                {' '}
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </div>
    );
}

export default Mentors;
