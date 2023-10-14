import { IClassNameProps } from "@bem-react/core";
import { BooksListItem } from "../../types/types";
import Item from "./Item";

export interface IListProps extends IClassNameProps {
  items: BooksListItem[]
}

const List: React.FC<IListProps> = ({ className, items }) => {

  let itemasArr = items.map((item, index) =>
    <li className="col" key={index}>
      <Item item={item} className="h-100 d-block border-0" />
    </li>
  )

  return (
      <ul className={`row ${className}`}>
        {itemasArr}
      </ul>
  );
}

export default List;
