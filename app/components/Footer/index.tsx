import React from 'react';
import Image from 'next/image';
import icons from '@/app/assets/icons'; // Đường dẫn đến biểu tượng của bạn

function Footer() {
    return (
        <footer className="bg-[#1f1f1f] px-[4rem] py-[2rem] text-white">
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-[2rem] md:grid-cols-3">
                <div>
                    <h3 className="mb-[1rem] text-[2rem] font-bold">
                        About Us
                    </h3>
                    <p className="text-justify text-[1.6rem]">
                        Our mentor system is designed to connect learners with
                        experienced professionals across various fields. Whether
                        you're seeking guidance, industry insights, or career
                        advice, our mentors are here to support you every step
                        of the way. Join our community and start your journey
                        towards success with the help of our dedicated mentors.
                    </p>
                </div>
                <div>
                    <h3 className="mb-[1rem] text-[2rem] font-bold">
                        Quick Links
                    </h3>
                    <ul className="text-[1.6rem]">
                        <li className="mb-[0.5rem] hover:underline">
                            <a href="#">Home</a>
                        </li>
                        <li className="mb-[0.5rem] hover:underline">
                            <a href="#">About</a>
                        </li>
                        <li className="mb-[0.5rem] hover:underline">
                            <a href="#">Services</a>
                        </li>
                        <li className="mb-[0.5rem] hover:underline">
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-[1rem] text-[2rem] font-bold">
                        Contact Us
                    </h3>
                    <p className="text-[1.6rem]">Email: dvquang59@gmail.com</p>
                    <p className="text-[1.6rem]">Phone: 0359088784</p>
                    <div className="mt-[1rem] flex gap-[1rem]">
                        <a
                            href="https://www.facebook.com/profile.php?id=100026227323706&locale=vi_VN"
                            className="hover:opacity-75"
                        >
                            <Image
                                src={icons.facebook}
                                alt="Facebook"
                                width={24}
                                height={24}
                            />
                        </a>
                        <a href="#" className="hover:opacity-75">
                            <Image
                                src={icons.twitter}
                                alt="Twitter"
                                width={24}
                                height={24}
                            />
                        </a>
                        <a
                            href="https://www.instagram.com/_qit5902/?hl=vi"
                            className="hover:opacity-75"
                        >
                            <Image
                                src={icons.instagram}
                                alt="Instagram"
                                width={24}
                                height={24}
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-[2rem] text-center text-[1.6rem]">
                &copy; {new Date().getFullYear()} Mentors system. All rights
                reserved.
            </div>
        </footer>
    );
}

export default Footer;
