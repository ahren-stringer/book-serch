import { IClassNameProps } from "@bem-react/core";
import { Book } from "../../types/types";
import { Link } from "react-router-dom";
import placeholder from '../../images/placeholder_card.png'

export interface IDetailPageProps extends IClassNameProps {
  bookDetail: Book,
}

const DetailPage: React.FC<IDetailPageProps> = ({ className, bookDetail }) => {


  return (
    <section className="">
      <Link className="icon-link" to="/">
        <svg width="16" height="14" viewBox="0 0 16 14" stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M1 7H14.5M1 7L7 13M1 7L7 1" strokeWidth="1.8" strokeLinecap="round"
            strokeLinejoin="round" />
        </svg>
        Назад
      </Link>

      <div className="product-detail row row-cols-1 row-cols-lg-2 g-4">

        <div className="col">
          <div className="product-detail__image text-center">
            {
              bookDetail.imageLinks ?
                <img className="product-detail__imgage-img text-center"
                  src={bookDetail.imageLinks}
                  alt={bookDetail.title} />

                : <img src={placeholder}  alt={bookDetail.title} />
            }

          </div>
        </div>

        <div className="col">
          <div className="mt-4">
            {
              bookDetail.categories &&
              <p className="text-body-secondary text-decoration-underline mb-2">
                {bookDetail.categories.join('/')}
              </p>
            }

            <h1>
              {bookDetail.title}
            </h1>
            {
              bookDetail.authors &&
              <p className="text-body-secondary">
                {bookDetail.authors.join(', ')}
              </p>
            }
            {
              bookDetail.description &&
              <p>
                {bookDetail.description}
              </p>
            }
          </div>
        </div>

      </div>
    </section>
  );
}

export default DetailPage;
