import { useAppSelector } from "../../state/hooks";
import Preloader from "../Preloader/Preloader";
import { FetchStatus } from "../../state/slices/searchSlice";
import NoResults from "../NoResults/NoResults";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import CenteredMessage from "../HOC/CenteredMessage";
import Result from "./Result";

function ResultContainer() {

    // const items = useAppSelector(selectBooks)
    const items = useAppSelector(state => state.search.entities)
    let status = useAppSelector(state => state.search.status)
    let noResults = useAppSelector(state => state.search.noResults)
    let error = useAppSelector(state => state.search.listError)




    if (!error) {
        if (status === FetchStatus.done && !noResults && !items.length) {
            return <div className="text-center">Find Book</div>
        }
        if (status === FetchStatus.loading && !noResults && !items.length) {
            return (
                <CenteredMessage>
                    <Preloader />
                </CenteredMessage>
            )
        }
        if ((status === FetchStatus.done && !noResults && items.length) || (status === FetchStatus.loading && !noResults && items.length)) {
            return <Result items={items} />
        }
        if (status === FetchStatus.done && noResults && !items.length) {
            return (
                <CenteredMessage>
                    <NoResults />
                </CenteredMessage>
            )
        }
    } else {
        return (
            <CenteredMessage>
                <ErrorMessage errorMessage={'Ошибка загрузки результатов'} />
            </CenteredMessage>
        )
    }


    return null
}

export default ResultContainer;
