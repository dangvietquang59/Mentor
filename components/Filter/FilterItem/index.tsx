'use client';
import icons from '@/assets/icons';
import type { CheckboxProps } from 'antd';
import { Checkbox, Slider } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

interface IFilterItem {
    title: string;
    arrayItem?: any[];
    rangeFilter?: boolean;
}

function FilterItem({ title, arrayItem, rangeFilter = false }: IFilterItem) {
    const [showList, setShowList] = useState<boolean>(false);
    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    return (
        <div className="grid gap-[1.6rem]">
            <div
                className={`flex cursor-pointer items-center justify-between rounded-[0.8rem] bg-gradient-to-r from-[#355429] to-[#5dd62c] px-[1.5rem] py-[1rem]`}
                onClick={() => arrayItem && setShowList(!showList)}
            >
                <h2 className="text-[2rem]">{title}</h2>
                {arrayItem && <Image src={icons.chevronDown} alt="icon" />}
            </div>
            {showList && arrayItem && (
                <ul className="ml-[1.6rem] grid gap-[0.8rem]">
                    {arrayItem.map((item) => (
                        <li key={item.id}>
                            <Checkbox onChange={onChange}>
                                <span className="text-[1.6rem] !text-white">
                                    {item.name}
                                </span>
                            </Checkbox>
                        </li>
                    ))}
                </ul>
            )}
            {rangeFilter && <Slider range defaultValue={[20, 50]} />}
        </div>
    );
}

export default FilterItem;
