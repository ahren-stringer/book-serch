import { useAppDispatch, useAppSelector } from "../../state/hooks"
import { FetchStatus, loadMore } from "../../state/slices/searchSlice"

export interface IButtonProps {
  text: string
  type: string,
  handler: Function
}

function Button({ type, handler, text }: IButtonProps) {

  return (
    <button
      onClick={(e) => { handler(e) }}
      className="btn btn-primary" type="button">
      <span role="status">
        {text}
      </span>
    </button>
  );
}

export default Button;
