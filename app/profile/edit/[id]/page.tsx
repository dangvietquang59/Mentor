'use client';
import authApi from '@/apis/authApi';
import technologiesApi from '@/apis/technologiesApi';
import uploadApi from '@/apis/uploadApi';
import userApi from '@/apis/userApi';
import icons from '@/assets/icons';
import ButtonCustom from '@/components/ButtonCustom';
import ExperienceTag, { ExperienceProps } from '@/components/ExperienceTag';
import InputComponent from '@/components/Input';
import SelectComponent from '@/components/Select';
import { TechnologiesType } from '@/types/response/technologies';
import { UserType } from '@/types/user';
import { formValidation } from '@/utils/constants/formValidation';
import variables from '@/utils/constants/variables';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { useMounted } from '@/utils/hooks/useMounted';
import { Avatar, Modal } from 'antd';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import FreetimeForm from '@/components/FreetimeForm';
import { JobTitleType } from '@/types/response/jobTitle';
import jobTitleApi from '@/apis/jobTitleApi';

function EditProfile() {
    const mounted = useMounted();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalImageOpen, setIsModalImageOpen] = useState(false);
    const [experiences, setExperiences] = useState<ExperienceProps[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [technologies, setTechnologies] = useState<TechnologiesType[]>([]);
    const [jobTitles, setJobTitles] = useState<JobTitleType[]>([]);
    const [currentPageJobTitle, setCurrentPageJobTitle] = useState<number>(1);
    const [currentPageTech, setCurrentPageTech] = useState<number>(1);
    const [totalPageJobTitle, setTotalPageJobTitle] = useState<number>(0);
    const [totalPageTech, setTotalPageTech] = useState<number>(0);
    const pathname = usePathname();
    const profileId = pathname.split('/profile/')[1]?.split('/')[1];
    const [profileUser, setProfileUser] = useState<UserType | null | undefined>(
        null,
    );

    const accessToken = getAccessTokenClient() || '';

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

    useEffect(() => {
        if (profileId) {
            const fetchProfile = async () => {
                await authApi
                    .getProfile(profileId, accessToken)
                    .then((res) => {
                        Cookies.set(variables.PROFILE, JSON.stringify(res));
                        setProfileUser(res);

                        const formatData = (res?.technologies || []).map(
                            (item) => ({
                                id: item?.technology?._id,
                                technology: item?.technology?.name || '',
                                experienceYears: item?.experienceYears || 0,
                            }),
                        );

                        setExperiences([...formatData]);
                    })
                    .catch((error) => {
                        console.error('Error fetching profile:', error);
                    });
            };
            fetchProfile();
        }
    }, [profileId]);
    const fetchJobTittle = async () => {
        await jobTitleApi
            .getAll(currentPageJobTitle)
            .then((res) => {
                if (res) {
                    setTotalPageJobTitle(res?.totalPages);
                    setJobTitles((prevJobs) => [...prevJobs, ...res?.jobs]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fetchTechnologies = async () => {
        await technologiesApi
            .getAll(currentPageTech)
            .then((res) => {
                if (res) {
                    setTotalPageTech(res?.totalPages);
                    setTechnologies((prevJobs) => [
                        ...prevJobs,
                        ...res?.technologies,
                    ]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchTechnologies();

        fetchJobTittle();
    }, [currentPageJobTitle, currentPageTech]);

    const handleScrollPopUpJobTitle = (e: React.UIEvent<HTMLDivElement>) => {
        if (e && e.currentTarget) {
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
            if (
                scrollTop + clientHeight >= scrollHeight &&
                currentPageJobTitle < (totalPageJobTitle || 1)
            ) {
                setCurrentPageJobTitle((prevPage) => prevPage + 1);
            }
        }
    };
    const handleScrollPopUpTech = (e: React.UIEvent<HTMLDivElement>) => {
        if (e && e.currentTarget) {
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
            if (
                scrollTop + clientHeight >= scrollHeight &&
                currentPageTech < (totalPageTech || 1)
            ) {
                setCurrentPageTech((prevPage) => prevPage + 1);
            }
        }
    };
    const handleUpload = async () => {
        if (!imageFile) return;

        try {
            const res = await uploadApi.uploadFile(imageFile);

            if (res?.result?.url) {
                await userApi
                    .updateProfileImage(
                        {
                            imageUrl: res.result.url,
                        },
                        profileId || '',
                        acessToken,
                    )
                    .then((res) => {
                        toast.success('Upload image successful');
                        setSelectedImage(res.result.url);
                        console.log(res);
                        localStorage.setItem(variables.PROFILE, res.result.url);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
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
    const handleDeleteExperience = (index: number) => {
        setExperiences((prevExperiences) =>
            prevExperiences.filter((_, i) => i !== index),
        );
    };

    // Profile form
    const {
        control: profileControl,
        handleSubmit: handleProfileSubmit,
        reset: resetProfileForm,
        formState: { errors: profileErrors },
    } = useForm<UserType>();

    useEffect(() => {
        resetProfileForm({
            email: profileUser?.email || '',
            bio:
                typeof profileUser?.bio === 'object'
                    ? profileUser?.bio?._id
                    : { _id: undefined, name: undefined },

            fullName: profileUser?.fullName || '',
            rating: profileUser?.rating || '',
            role: profileUser?.role || '',
            pricePerHour: profileUser?.pricePerHour || 0,
        });
    }, [profileUser, resetProfileForm]);

    const onSubmitProfile = async (data: UserType) => {
        const formatedExperiences =
            experiences.length > 0
                ? experiences.map((item) => ({
                      technology: item?.id || '',
                      experienceYears: Number(item?.experienceYears) || 0,
                  }))
                : [];

        const newProfileData = {
            ...data,
            experience: formatedExperiences,
        };

        try {
            await userApi.updateProfile(newProfileData, profileId, accessToken);
            toast.success('Update profile successful');
            setIsEdit(false);
        } catch (error) {
            console.log('API Error:', error);
        }
    };

    // Experiences form
    const {
        control: experienceControl,
        handleSubmit: handleExperienceSubmit,
        reset: resetExperienceForm,
        formState: { errors: experienceErrors },
    } = useForm<ExperienceProps>();

    const onSubmitExperience = async (data: ExperienceProps) => {
        const filterTechName = technologies.find(
            (item) => item?._id === data?.technology,
        );

        const technologyName = filterTechName?.name || '';

        const newData: ExperienceProps = {
            ...data,
            technology: technologyName,
            id: filterTechName?._id || '',
        };

        setExperiences((prev) => [...prev, newData]);
        resetExperienceForm();
    };

    return (
        <>
            {mounted && (
                <div className="mx-[10%] mt-[2.4rem] flex gap-[2.4rem]">
                    <div className="flex flex-1 flex-col gap-[2.4rem]">
                        <div className=" min-h-[50rem] rounded-[0.8rem] bg-[#242526]  p-[2rem]">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[2.4rem] font-bold text-[#5DD62C]">
                                    Information
                                </h2>
                                {!isEdit ? (
                                    <ButtonCustom
                                        onClick={() => setIsEdit(true)}
                                    >
                                        Edit profile
                                    </ButtonCustom>
                                ) : (
                                    <div className="flex items-center gap-[1.2rem]">
                                        <ButtonCustom
                                            outline
                                            onClick={() => setIsEdit(false)}
                                            className="w-[10rem]"
                                        >
                                            Cancel
                                        </ButtonCustom>
                                        <ButtonCustom
                                            onClick={handleProfileSubmit(
                                                onSubmitProfile,
                                            )}
                                            className="w-[10rem]"
                                        >
                                            Save
                                        </ButtonCustom>
                                    </div>
                                )}
                            </div>
                            <div>
                                <form
                                    className="mt-[2.4rem] flex flex-col gap-[1.2rem]"
                                    onSubmit={handleProfileSubmit(
                                        onSubmitProfile,
                                    )}
                                >
                                    <div className="grid grid-cols-2 gap-[1.2rem]">
                                        <InputComponent
                                            control={profileControl}
                                            name="fullName"
                                            label="Full name"
                                            placeholder="Full name"
                                            disabled={!isEdit}
                                        />
                                        <InputComponent
                                            control={profileControl}
                                            name="email"
                                            label="Email"
                                            placeholder="Email"
                                            disabled={!isEdit}
                                        />
                                    </div>
                                    <SelectComponent
                                        name="bio"
                                        control={profileControl}
                                        label="Job title"
                                        options={
                                            jobTitles &&
                                            jobTitles.map((item) => ({
                                                label: item?.name,
                                                value: item?._id,
                                            }))
                                        }
                                        onPopupScroll={
                                            handleScrollPopUpJobTitle
                                        }
                                        rules={formValidation.bio}
                                        disabled={!isEdit}
                                    />

                                    <div className="grid grid-cols-2 gap-[1.2rem]">
                                        <InputComponent
                                            control={profileControl}
                                            name="role"
                                            label="Role"
                                            placeholder="Role"
                                            className="w-full"
                                            disabled
                                        />
                                        <InputComponent
                                            control={profileControl}
                                            name="rating"
                                            label="Rating"
                                            placeholder="Rating"
                                            disabled
                                            className="w-full"
                                        />
                                        <InputComponent
                                            control={profileControl}
                                            name="pricePerHour"
                                            label="Price per hour"
                                            placeholder="Price per hour"
                                            disabled={!isEdit}
                                            className="w-full"
                                        />
                                    </div>
                                </form>
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
                                <ul className="grid grid-cols-4 gap-[1.2rem]">
                                    {experiences.length > 0 &&
                                        experiences?.map((item, index) => (
                                            <li key={index}>
                                                <ExperienceTag
                                                    technology={
                                                        item?.technology
                                                    }
                                                    experienceYears={
                                                        item?.experienceYears
                                                    }
                                                    onDelete={() =>
                                                        handleDeleteExperience(
                                                            index,
                                                        )
                                                    }
                                                    showIcon={isEdit}
                                                />
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <FreetimeForm />
                    </div>
                    <div className="flex h-[40rem] w-[30rem] flex-col items-center justify-center">
                        <Avatar
                            src={profileUser?.imageUrl || selectedImage}
                            size={300}
                            className="h-full w-full border-[0.2rem] border-[#ccc]"
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
                            className="mt-4 rounded bg-[#59C82C] p-[1rem_2rem] px-4 py-2 text-[1.6rem] text-black"
                        >
                            Choose image
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
                        src={selectedImage || profileUser?.imageUrl}
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
                        width: 500,
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
                                onSubmit={handleExperienceSubmit(
                                    onSubmitExperience,
                                )}
                                className="flex flex-col gap-[1.2rem]"
                            >
                                <SelectComponent
                                    name="technology"
                                    control={experienceControl}
                                    label="Technology"
                                    options={
                                        technologies &&
                                        technologies.map((item) => ({
                                            label: item?.name,
                                            value: item?._id,
                                        }))
                                    }
                                    onPopupScroll={handleScrollPopUpTech}
                                    errors={experienceErrors.technology}
                                    rules={formValidation.technologies}
                                />

                                <InputComponent
                                    control={experienceControl}
                                    name="experienceYears"
                                    label="Experience years"
                                    placeholder="Enter your experience year"
                                    type="number"
                                    errors={experienceErrors.experienceYears}
                                    rules={formValidation.experiemceYears}
                                />
                                <ButtonCustom
                                    className="mt-[1.2rem]"
                                    type="submit"
                                >
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
