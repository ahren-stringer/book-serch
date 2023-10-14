import { IClassNameProps } from "@bem-react/core";
import { BooksListItem } from "../../types/types";
import { Link } from "react-router-dom";
import placeholder from '../../images/placeholder_card.png'

export interface IItemProps extends IClassNameProps {
  item: BooksListItem
}

const Item: React.FC<IItemProps> = ({ className, item }) => {
   
  return (
    <Link to={`books/${item.id}`}>
      <div className={`card ${className}`}>
        <div className="text-center">
          {item.imageLinks
            ? <img src={item.imageLinks} alt={item.title} /> : <img src={placeholder} alt=""/>
          }

        </div>

        <div className="card-body">
          {
            item.categories
              ?
              <p className="text-body-secondary text-decoration-underline mb-2">
                {item.categories[0]}
              </p>
              :
              null
          }

          <h5 className="card-title">{item.title}</h5>


          {
            item.authors
              ?
              <p className="text-body-secondary">
                {item.authors.join(', ')}
              </p>
              :
              null
          }


        </div>
      </div>
    </Link>
  );
}

export default Item;
