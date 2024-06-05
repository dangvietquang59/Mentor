'use client';
import BlogItem from '../../components/BlogItem';
import React from 'react';
import SesionToday from '../../components/SesstionToday';

const Dashboard = () => {
    return (
        <div>
            <h2 className="mb-[2.4rem] text-[2rem] font-bold">Dash board</h2>
            <div className="flex gap-[2.4rem]">
                <div className="flex max-w-[72%] flex-wrap gap-[1.2rem]">
                    <BlogItem />
                    <BlogItem />
                    <BlogItem />
                    <BlogItem />
                    <BlogItem />
                    <BlogItem />
                </div>
                <div className="w-[28%]">
                    <SesionToday />
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
