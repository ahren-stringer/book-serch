import { BooksListItem } from "../../types/types";
import LoadMoreBtn from "../Buttons/LoadMoreBtn";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import Count from "./Count";
import List from "./List";
import { loadMore } from "../../state/slices/searchSlice";

export interface IResultProps {
  items: BooksListItem[]
}

const Result: React.FC<IResultProps> = ({ items }) => {

  let count = useAppSelector(state => state.search.count)
  let pageNumber = useAppSelector(state => state.search.pageNumber)
  let paginationStep = useAppSelector(state => state.search.paginationStep)
  let loadMoreError = useAppSelector(state => state.search.loadMoreError)
  let searchStr = useAppSelector(state => state.search.searchStr)
  let category = useAppSelector(state => state.search.cat)
  let sort = useAppSelector(state => state.search.sort)
  let status = useAppSelector(state => state.search.status)

  let dispatch = useAppDispatch()

  const onBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(loadMore({
      searchStr,
      category,
      sort,
      pageNumber: paginationStep * pageNumber,
      paginationStep
    }))
  }

  return (
    <div>
      <div className="mb-4">
        <Count />
      </div>

      <List items={items} className="row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4" />

      <div className="d-flex align-items-center justify-content-center mt-4">
        {
          (count && (count <= (pageNumber) * paginationStep)) ||
          <LoadMoreBtn
            handler={onBtnClick}
            type='load-more'
            status={status}
            text="Load more"
          />
        }
        {loadMoreError && 'не удалось загрузить больше'}
      </div>
    </div>
  );
}

export default Result;
