interface TimeItemProps {
    name: string;
    isSelected: string;
    onSelected: (value: string) => void;
}

function TimeItem({ name, isSelected, onSelected }: TimeItemProps) {
    return (
        <div
            className={`flex cursor-pointer items-center justify-center rounded-[0.8rem] border-[0.1rem] p-[1rem] duration-300 hover:border-[#5CD22C] ${
                isSelected === name
                    ? 'border-[#5CD22C] bg-[#5CD22C] text-black'
                    : ''
            }`}
            onClick={() => onSelected(name)}
        >
            <span className="text-[2rem] font-bold">{name}</span>
        </div>
    );
}

export default TimeItem;
