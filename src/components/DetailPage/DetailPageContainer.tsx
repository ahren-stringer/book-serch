import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import Preloader from '../Preloader/Preloader';
import DetailPage from './DetailPage';
import { clearBookDetail, getBookDetail } from '../../state/slices/searchSlice';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import CenteredMessage from '../HOC/CenteredMessage';

function DetailPageContainer() {

    let { bookId } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (bookId) {
            dispatch(getBookDetail((bookId)))
        }
        return () => {
            dispatch(clearBookDetail())
        }
    }, [])

    const bookDetail = useAppSelector(state => state.search.bookDetail)
    const detailError = useAppSelector(state => state.search.detailError)

 
    if (!detailError) {
        if (bookDetail && bookId) {
            return <DetailPage bookDetail={bookDetail} />
        } else {
            return (
                <CenteredMessage>
                    <Preloader />
                </CenteredMessage>
            )
        }
    } else {
        return (
            <CenteredMessage>
                <ErrorMessage errorMessage='Ошибка поиска информации о книге' />
            </CenteredMessage>
        )
    }

}

export default DetailPageContainer;
