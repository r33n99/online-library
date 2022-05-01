import React from "react";
import { useSelector } from "react-redux";
import { Book } from "../components/Book";
import { Categories } from "../components/Categories";

export const WishList = (props) => {
  const { sortBooks, sortBooksByCategory, onSelectFavorite } =
    props;
  const [isWishList] = React.useState(true);
  const { favorites } = useSelector((state) => state.books);

  return (
    <div className="wish-list container">
      <Categories sortBooksByCategory={sortBooksByCategory} />
      <div className="wish-list__content">
        {favorites.length > 0 ? (
          sortBooks?.map((book) =>
            favorites?.map((fav, index) =>
              book.id === fav ? (
                <Book
                  key={`${fav}_${index}`}
                  onSelectFavorite={onSelectFavorite}
                  isWishList={isWishList}
                  {...book}
                />
              ) : null
            )
          )
        ) : (
          <div className="wish-list__no-content">
            Отсутствуют какие-либо книги в Wish list 😦
          </div>
        )}
      </div>
    </div>
  );
};
