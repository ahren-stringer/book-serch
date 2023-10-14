import { FetchStatus } from "../../state/slices/searchSlice"
import { IButtonProps } from "./Batton";

interface ILoadMoreBtn extends IButtonProps {
  status: FetchStatus
}

function LoadMoreBtn({ type, handler, status, text }: ILoadMoreBtn) {

  return (
    <button
      onClick={(e) => { handler(e) }}
      className="btn btn-primary btn--iconed" type="button">
      {
        (type === 'load-more' && status === FetchStatus.loading) && <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
      }
      <span role="status">
        {text}
      </span>
    </button>
  );
}

export default LoadMoreBtn;
