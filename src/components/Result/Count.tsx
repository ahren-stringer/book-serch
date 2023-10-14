import { useAppSelector } from "../../state/hooks";

const Count: React.FC = () => {

    let count = useAppSelector(state => state.search.count)


    return (
        <div>Found {count} results</div>
    );
}

export default Count;
