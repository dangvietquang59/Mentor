import { limitWord } from '@/app/functions/limitWords';
import { NewsFeedItemProps } from '@/app/types/blog';
import Link from 'next/link';

function NewsFeedItem({ description, title, imageUrl }: NewsFeedItemProps) {
    return (
        <Link href={'/blog'}>
            <div className="my-[1.2rem] flex max-h-[30rem] min-h-[40rem] w-[38.5rem] flex-col gap-[0.8rem] overflow-hidden rounded-[1rem]">
                <picture>
                    <img
                        src={imageUrl}
                        alt="image"
                        className="h-[20rem] w-full object-cover"
                    />
                </picture>
                <div className="flex flex-col gap-[0.8rem] px-[2rem]">
                    <h2 className="text-[2rem] font-bold">
                        {limitWord(title, 10)}
                    </h2>
                    <p className="text-justify text-[1.6rem] font-medium">
                        {limitWord(description, 22)}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default NewsFeedItem;
