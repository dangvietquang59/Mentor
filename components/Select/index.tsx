import { Select, SelectProps } from 'antd';
import clsx from 'clsx';
import { Controller, FieldError, RegisterOptions } from 'react-hook-form';

interface ISelectComponentProps extends SelectProps {
    name: string;
    rules?: RegisterOptions;
    errors?: FieldError;
    helptext?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control?: any;
    containerClasName?: string;
    className?: string;
    labelClassName?: string;
    label?: string;
    isRequired?: boolean;
}
const SelectComponent = (props: ISelectComponentProps) => {
    const {
        name,
        rules,
        errors,
        helptext,
        options,
        control,
        containerClasName,
        className,
        labelClassName,
        label,
        isRequired,
        ...rest
    } = props;

    if (!control)
        return (
            <div
                className={clsx(
                    'flex w-auto flex-col gap-[0.6rem]',
                    containerClasName,
                )}
            >
                {!!label && (
                    <label
                        className={clsx(
                            'text-[1.4rem] font-[500] leading-[2rem] text-[#f8f8f8]',
                            labelClassName,
                        )}
                    >
                        {label}
                    </label>
                )}

                <Select
                    className={clsx(
                        'h-[4.2rem] w-full border-[#000] text-[1.4rem] font-[500] leading-[2rem] text-black hover:!border-[#000] focus:border-[#000] focus:shadow-none',
                        className,
                    )}
                    {...rest}
                >
                    {options?.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </div>
        );
    return (
        <div
            className={clsx(
                'flex w-auto flex-col gap-[0.6rem]',
                containerClasName,
            )}
        >
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
            <div className="flex flex-row">
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                            className={clsx(
                                'h-[4.2rem] w-full border-[#000] text-[1.4rem] font-[500] leading-[2rem] hover:!border-[#000] focus:border-[#000] focus:shadow-none',
                                className,
                            )}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                            {...rest}
                        >
                            {options?.map((option) => (
                                <Select.Option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </Select.Option>
                            ))}
                        </Select>
                    )}
                />
            </div>
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

export default SelectComponent;
