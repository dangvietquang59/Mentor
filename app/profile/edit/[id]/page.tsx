'use client';
import uploadApi from '@/apis/uploadApi';
import userApi from '@/apis/userApit';
import icons from '@/assets/icons';
import ButtonCustom from '@/components/ButtonCustom';
import InputComponent from '@/components/Input';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { getProfile } from '@/utils/functions/getProfile';
import { useMounted } from '@/utils/hooks/useMounted';
import { Avatar, Modal } from 'antd';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface SectionInformationProps {
    title: string;
    content: string;
    nameInput: string;
}
interface RenderTechProps {
    title: string;
    arrayItem: string[];
}
interface ExperienceProps {
    company: string;
    jobTitle: string;
    description: string;
    technologies: string[];
}
const technologies = {
    programming: [
        'JavaScript',
        'Python',
        'Java',
        'C#',
        'C++',
        'Ruby',
        'PHP',
        'TypeScript',
        'React.js',
        'Angular',
        'Vue.js',
        'Django',
        'Flask',
        'Spring Boot',
        '.NET',
        'Express.js',
    ],
    databases: [
        'MySQL',
        'PostgreSQL',
        'SQL Server',
        'Oracle',
        'MongoDB',
        'Cassandra',
        'Redis',
        'CouchDB',
        'Elasticsearch',
        'Apache Kafka',
    ],
    systemsNetworks: [
        'Linux',
        'Windows Server',
        'macOS',
        'Ansible',
        'Puppet',
        'Chef',
        'Wireshark',
        'Nmap',
        'VPN',
        'IDS/IPS',
    ],
    cloud: [
        'AWS',
        'Azure',
        'GCP',
        'IBM Cloud',
        'Terraform',
        'AWS Lambda',
        'Azure Functions',
    ],
    mobile: ['Android', 'iOS', 'React Native', 'Flutter', 'Xamarin'],
    dataScience: [
        'Python (Pandas, NumPy, Scikit-Learn, TensorFlow, PyTorch)',
        'R',
        'Apache Spark',
        'Jupyter Notebook',
        'Tableau',
        'Power BI',
    ],
    security: ['Metasploit', 'Burp Suite', 'OWASP ZAP'],
    devOps: [
        'Jenkins',
        'GitLab CI/CD',
        'CircleCI',
        'Travis CI',
        'Jira',
        'Trello',
        'Asana',
        'Confluence',
    ],
};

function EditProfile() {
    const mounted = useMounted();
    const profile = getProfile() || {};
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalImageOpen, setIsModalImageOpen] = useState(false);
    const [arrayListTech, setArrayListTech] = useState<string[]>([]);
    const [experiences, setExperiences] = useState<ExperienceProps[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const acessToken = getAccessTokenClient() || '';
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            showModalImage();
        }
    };

    const handleUpload = async () => {
        if (!imageFile) return;

        try {
            const res = await uploadApi.uploadFile(imageFile);

            if (res?.result?.url) {
                const updateRes = await userApi.updateProfileImage(
                    {
                        imageUrl: res.result.url,
                    },
                    profile?._id || '',
                    acessToken,
                );
                console.log(updateRes);
            } else {
                console.error('Upload succeeded but no secure URL found.');
            }

            setIsModalImageOpen(false);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const showModalImage = () => {
        setIsModalImageOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ExperienceProps>();
    const onSubmit = async (data: ExperienceProps) => {
        const newData: ExperienceProps = {
            ...data,
            technologies: arrayListTech,
        };
        setExperiences((prev) => [...prev, newData]);
        reset();
        setArrayListTech([]);
    };
    const SectionInformation = ({
        title,
        content,
        nameInput,
    }: SectionInformationProps) => {
        return (
            <div className="flex gap-[2.4rem]">
                <h3 className="text-[1.8rem] font-medium text-[#5DD62C]">
                    {title}
                </h3>
                {!isEdit ? (
                    <p className="line-clamp-5 text-[1.6rem]">{content}</p>
                ) : (
                    <>
                        <InputComponent
                            control={control}
                            name={nameInput}
                            placeholder="Front end developer"
                        />
                    </>
                )}
            </div>
        );
    };
    const RenderTechnology = ({ title, arrayItem }: RenderTechProps) => {
        const handleItemClick = useCallback(
            (item: string, event: React.MouseEvent) => {
                event.stopPropagation();
                setArrayListTech((prevList) =>
                    prevList.includes(item)
                        ? prevList.filter((tech) => tech !== item)
                        : [...prevList, item],
                );
            },
            [],
        );

        return (
            <>
                {mounted && (
                    <div>
                        <h3 className="text-[1.6rem] font-medium text-white">
                            {title}
                        </h3>

                        <ul className="mt-[1.2rem] flex flex-wrap gap-[0.8rem]">
                            {arrayItem.map((item, index) => (
                                <li
                                    key={index}
                                    className={`cursor-pointer rounded-[0.8rem]  border-[0.1rem]  p-[1rem] duration-300
                                       ${arrayListTech.includes(item) ? 'border-transparent bg-[#5CD22C] text-black' : 'border-[#ccc] bg-transparent text-[#ccc]'} 
                                       `}
                                    onClick={(event) =>
                                        handleItemClick(item, event)
                                    }
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </>
        );
    };
    const RenderExperiences = ({
        company,
        jobTitle,
        description,
        technologies,
    }: ExperienceProps) => {
        const [visibleCount, setVisibleCount] = useState(0);
        const listRef = useRef<HTMLUListElement>(null);

        useEffect(() => {
            if (listRef.current) {
                const maxHeight = 200;
                let totalHeight = 0;
                let count = 0;

                const listItems = Array.from(listRef.current.children);

                for (let li of listItems) {
                    totalHeight += (li as HTMLElement).clientHeight;
                    if (totalHeight > maxHeight) break;
                    count++;
                }

                setVisibleCount(count);
            }
        }, [technologies]);

        return (
            <div className="flex flex-col gap-[0.8rem] rounded-[0.8rem] bg-gradient-to-r from-[#03624c] to-[#5DD62C] p-[1rem]">
                <div className="flex flex-col gap-[0.2rem]">
                    <h3 className="m-0 text-[1.6rem] font-medium">{company}</h3>
                    <h3 className="m-0 text-[1.6rem] font-medium">
                        {jobTitle}
                    </h3>
                    <h3 className="m-0 line-clamp-2 text-[1.6rem] font-medium">
                        {description}
                    </h3>
                </div>
                <ul
                    ref={listRef}
                    className="flex flex-wrap items-center gap-[0.8rem] overflow-hidden"
                    style={{ maxHeight: '300px' }}
                >
                    {technologies.slice(0, visibleCount).map((item, index) => (
                        <li
                            key={index}
                            className="rounded-[0.8rem] bg-[#f0f0f0] p-[1rem] font-medium text-black"
                        >
                            {item}
                        </li>
                    ))}
                    {visibleCount < technologies.length && (
                        <li className="rounded-[0.8rem] bg-[#f0f0f0] p-[1rem] font-medium text-black">
                            +{technologies.length - visibleCount} more
                        </li>
                    )}
                </ul>
            </div>
        );
    };
    return (
        <>
            {mounted && (
                <div className="mx-[10%] mt-[2.4rem] flex gap-[2.4rem]">
                    <div className="min-h-[50rem] w-full flex-1 rounded-[0.8rem] bg-[#242526] p-[2rem]">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[2.4rem] font-bold text-[#5DD62C]">
                                Your information
                            </h2>
                            {!isEdit ? (
                                <ButtonCustom onClick={() => setIsEdit(true)}>
                                    Edit profile
                                </ButtonCustom>
                            ) : (
                                <div className="flex items-center gap-[1.2rem]">
                                    <ButtonCustom
                                        onClick={() => setIsEdit(false)}
                                    >
                                        Cancel
                                    </ButtonCustom>
                                    <ButtonCustom
                                        onClick={() => setIsEdit(true)}
                                    >
                                        Save
                                    </ButtonCustom>
                                </div>
                            )}
                        </div>
                        <div className="mt-[2.4rem] flex flex-col gap-[1.2rem]">
                            <>
                                <SectionInformation
                                    title="Full name"
                                    content={profile?.fullName}
                                    nameInput="fullName"
                                />
                                <SectionInformation
                                    title="Summary"
                                    nameInput="sumary"
                                    content={`Tôi là Quang, một Front-End Developer với hơn 7 năm kinh nghiệm trong việc thiết kế và phát triển giao diện người dùng web chất lượng cao. Tôi chuyên sâu vào việc xây dựng các ứng dụng web động và phản hồi nhanh, sử dụng các công nghệ tiên tiến như HTML5, CSS3, JavaScript, và các framework hiện đại như React và Angular.
        
                Bắt đầu sự nghiệp của mình tại [Tên Công Ty Đầu Tiên], tôi đã tham gia vào các dự án thiết kế và phát triển giao diện cho các ứng dụng thương mại điện tử, từ đó nâng cao kỹ năng về tối ưu hóa trải nghiệm người dùng và hiệu suất trang web. Sau đó, tôi gia nhập [Tên Công Ty Tiếp Theo], nơi tôi đóng vai trò quan trọng trong việc phát triển các tính năng mới cho nền tảng web và cải thiện tính tương thích của các ứng dụng với nhiều trình duyệt và thiết bị khác nhau.
        
                Trong vai trò hiện tại của tôi tại [Tên Công Ty Hiện Tại], tôi dẫn dắt các dự án phát triển giao diện người dùng cho các ứng dụng doanh nghiệp quy mô lớn, phối hợp chặt chẽ với các nhóm thiết kế và phát triển back-end để đảm bảo tích hợp mượt mà và hiệu quả. Tôi cũng tập trung vào việc cải tiến quy trình phát triển, áp dụng các phương pháp agile và DevOps để tăng cường tốc độ và chất lượng của sản phẩm.
        
                Với niềm đam mê không ngừng cho công nghệ web và thiết kế UX/UI, tôi luôn tìm kiếm cơ hội học hỏi và áp dụng các xu hướng mới nhất trong ngành để cung cấp các giải pháp sáng tạo và hiệu quả cho khách hàng và người dùng.`}
                                />
                            </>
                        </div>
                        <div className="mt-[1.2rem] flex items-center gap-[2.4rem]">
                            <h3 className="text-[1.8rem] font-medium text-[#5DD62C]">
                                Experience
                            </h3>
                            {isEdit && (
                                <div
                                    className="flex cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] border-[0.1rem] border-[#5DD62C] p-[0.4rem_2rem]"
                                    onClick={showModal}
                                >
                                    <Image src={icons.plus} alt="icon" />
                                    <span className="text-[1.4rem]">
                                        Add new{' '}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="mt-[2.4rem]">
                            <ul className="grid grid-cols-3 gap-[1.2rem]">
                                {experiences.length > 0 &&
                                    experiences?.map((item, index) => (
                                        <li key={index}>
                                            <RenderExperiences
                                                company={item?.company}
                                                jobTitle={item?.jobTitle}
                                                description={item?.description}
                                                technologies={
                                                    item?.technologies
                                                }
                                            />
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex w-[30rem] flex-col items-start justify-center">
                        <Avatar
                            src={profile?.imageUrl}
                            size={200}
                            className="border-[0.2rem] border-white"
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                        >
                            Chọn ảnh
                        </button>
                    </div>
                </div>
            )}
            <Modal
                open={isModalImageOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                closable={false}
            >
                <div className="flex items-center justify-center">
                    <img
                        src={selectedImage || profile?.imageUrl}
                        alt="image"
                        className="w-full"
                    />
                </div>
                <ButtonCustom
                    className="mt-[2.4rem] w-full"
                    onClick={handleUpload}
                >
                    Upload image
                </ButtonCustom>
            </Modal>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                closable={false}
                className="w-full max-w-[50rem]"
                styles={{
                    content: {
                        width: 700,
                    },
                }}
            >
                <>
                    {mounted && (
                        <div className="max-h-[50rem] overflow-auto p-[1rem]">
                            <h2 className="mb-[2.4rem] text-[2rem] font-bold text-white">
                                Create new experience
                            </h2>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-[1.2rem]"
                            >
                                <InputComponent
                                    control={control}
                                    name="company"
                                    label="Company"
                                    placeholder="One More company"
                                />
                                <InputComponent
                                    control={control}
                                    name="jobTitle"
                                    label="Job title"
                                    placeholder="Front end developer"
                                />
                                <InputComponent
                                    control={control}
                                    name="description"
                                    label="Description"
                                    placeholder="Description"
                                />
                                <RenderTechnology
                                    title="Programing"
                                    arrayItem={technologies?.programming}
                                />
                                <RenderTechnology
                                    title="Database"
                                    arrayItem={technologies?.databases}
                                />
                                <RenderTechnology
                                    title="Systems Network"
                                    arrayItem={technologies?.systemsNetworks}
                                />
                                <RenderTechnology
                                    title="Cloud"
                                    arrayItem={technologies?.cloud}
                                />
                                <RenderTechnology
                                    title="Mobile"
                                    arrayItem={technologies?.mobile}
                                />
                                <RenderTechnology
                                    title="Data Science"
                                    arrayItem={technologies?.dataScience}
                                />
                                <RenderTechnology
                                    title="Security"
                                    arrayItem={technologies?.security}
                                />
                                <RenderTechnology
                                    title="Dev ops"
                                    arrayItem={technologies?.devOps}
                                />
                                <ButtonCustom className="mt-[1.2rem]">
                                    Save
                                </ButtonCustom>
                            </form>
                        </div>
                    )}
                </>
            </Modal>
        </>
    );
}

export default EditProfile;
