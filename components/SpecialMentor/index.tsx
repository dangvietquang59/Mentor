interface SpecialMentorProps {
    url: string;
}
function SpecialMentor({ url }: SpecialMentorProps) {
    return (
        <div className="h-[40rem] w-[80rem]">
            <picture>
                <img
                    src={url}
                    alt="image"
                    className="h-full w-full rounded-[2rem] object-cover"
                />
            </picture>
        </div>
    );
}

export default SpecialMentor;
