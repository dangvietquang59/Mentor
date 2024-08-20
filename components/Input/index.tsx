import {
    EyeInvisibleOutlined,
    EyeOutlined,
    EyeTwoTone,
} from '@ant-design/icons';
import { Input, InputProps } from 'antd';
import clsx from 'clsx';
import { Controller, FieldError, RegisterOptions } from 'react-hook-form';

interface IInputComponentProps extends InputProps {
    isPassword?: boolean;
    label?: string;
    labelClassName?: string;
    control?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    name: string;
    rules?: RegisterOptions;
    errors?: FieldError;
    helptext?: string;
    isRequired?: boolean;
}

const InputComponent = (props: IInputComponentProps) => {
    const {
        isPassword,
        label,
        labelClassName,
        className,
        control,
        name,
        rules,
        errors,
        helptext,
        isRequired = false,
        ...rest
    } = props;

    return (
        <div className="flex flex-col gap-[0.6rem]">
            {!!label && (
                <div className="flex items-center gap-[0.8rem]">
                    <label
                        className={clsx(
                            'text-[1.4rem] font-[500] leading-[2rem] text-[#f8f8f8]',
                            labelClassName,
                        )}
                    >
                        {label}
                    </label>
                    <div
                        className={clsx(
                            'flex items-center justify-center',
                            isRequired ? 'visible' : 'invisible',
                        )}
                    >
                        <span className="text-[1.6rem] font-bold text-[red]">
                            *
                        </span>
                    </div>
                </div>
            )}

            {control ? (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field: { onChange, onBlur, value, ref } }) =>
                        isPassword ? (
                            <Input.Password
                                className={clsx(
                                    'h-[4.2rem] border-0 bg-[#1a1a1a] text-[1.4rem] font-[500] leading-[2rem] text-[#FFFFFF] !placeholder-white focus-within:!bg-[#1a1a1a] hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] focus:ring-transparent',
                                    className,
                                )}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                {...rest}
                            />
                        ) : (
                            <Input
                                className={clsx(
                                    'h-[4.2rem] border-0 bg-[#1a1a1a] text-[1.4rem] font-[500] leading-[2rem] text-[#FFFFFF] placeholder-[#848484] hover:bg-[#1a1a1a] focus:bg-[#1a1a1a]',
                                    className,
                                )}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                {...rest}
                            />
                        )
                    }
                />
            ) : (
                <Input
                    className={clsx(
                        'h-[4.2rem] border-0 bg-[#1a1a1a] text-[1.4rem] font-[500] leading-[2rem] text-[#FFFFFF] placeholder-white hover:bg-[#1a1a1a] focus:bg-[#1a1a1a]',
                        className,
                    )}
                    {...rest}
                />
            )}

            {helptext && (
                <p className="text-[1.4rem] font-[500] leading-[2rem] text-[#667085]">
                    {helptext}
                </p>
            )}
            {errors && (
                <p className="text-[1.4rem] font-[500] leading-[2rem] text-red-500">
                    {errors.message}
                </p>
            )}
        </div>
    );
};

export default InputComponent;
