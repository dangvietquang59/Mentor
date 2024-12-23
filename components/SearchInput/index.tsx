import icons from '@/assets/icons';
import Image from 'next/image';
interface SearchInputProps {
    className?: string;
    query: string;
    setQuery: (value: string) => void;
}
function SearchInput({ className, query, setQuery }: SearchInputProps) {
    return (
        <div
            className={`flex h-[4rem] items-center rounded-[0.8rem] bg-[#3A3B3C] p-[1rem] ${className}`}
        >
            <Image src={icons.search} alt="icon" />
            <input
                placeholder="Tìm kiếm..."
                className="h-full grow bg-transparent p-[1rem] text-[1.4rem] focus-within:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}

export default SearchInput;
