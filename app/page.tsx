'use client';
import BlogItem from './components/BlogItem';
import React from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import SesionToday from './components/SesstionToday';

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
const Home = () => {
    const { token } = theme.useToken();

    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    return (
        <div className="flex gap-[2.4rem]">
            <div className="mt-[2rem] flex max-w-[75%] flex-wrap gap-[2.4rem]">
                <BlogItem />
                <BlogItem />
                <BlogItem />
                <BlogItem />
            </div>
            <div className="w-[25%] p-[1rem]">
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                <SesionToday />
            </div>
        </div>
    );
};
export default Home;
