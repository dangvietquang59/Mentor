import FilterItem from './FilterItem';
interface IPositionProps {
    id: string;
    name: string;
}
function Filter() {
    const arrayPosition: IPositionProps[] = [
        {
            name: 'Dev ops',
            id: '1',
        },
        {
            name: 'Front end',
            id: '2',
        },
        {
            name: 'Back end',
            id: '3',
        },
        {
            name: 'Full snack',
            id: '4',
        },
    ];
    const arrayExperience: IPositionProps[] = [
        {
            name: '< 10 years',
            id: '1',
        },
        {
            name: '10 - 15 years',
            id: '2',
        },
        {
            name: '15 - 20 years',
            id: '3',
        },
        {
            name: '> 20 years',
            id: '4',
        },
    ];
    return (
        <div>
            <h2 className="mb-[2.4rem] text-[2.4rem] font-medium">Filter</h2>
            <div className="grid gap-[2.4rem]">
                <FilterItem title="Positon" arrayItem={arrayPosition} />
                <FilterItem title="Experience" arrayItem={arrayExperience} />
            </div>
        </div>
    );
}

export default Filter;
