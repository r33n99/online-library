import React from "react";
import { useSelector } from "react-redux";
import AddBook from "../components/AddBook";
import { Book } from "../components/Book";
import { Categories } from "../components/Categories";
export const Home = (props) => {
  const { setSortBooks, sortBooks, sortBooksByCategory, onSelectFavorite } =
    props;
  const { books, loading } = useSelector((state) => state.books);
  const [isModal, setIsModal] = React.useState(false);

  React.useEffect(() => {
    setSortBooks(books);
  }, [books, setSortBooks]);

  const categories = books.map((book) => book.category);

  const searchCopyGenre = (array) => {
    let names = {};
    array.forEach((item) => {
      names[item] = (names[item] || 0) + 1;
    });
    return names;
  };
  const copyGenre = searchCopyGenre(categories);

  return (
    <div className="home-page container">
      <div className="home-page__header">
        <button onClick={() => setIsModal(!isModal)}>Добавить книгу</button>
        <Categories sortBooksByCategory={sortBooksByCategory} />
      </div>
      <div className="home-page__info">
        <span>Всего книг: {books.length}</span>
        <br />
        {Object.entries(copyGenre).map(([key, value]) => (
          <div>
            <span key={key}>
              {key} : {value}
            </span>
            <br />
          </div>
        ))}
      </div>

      <div className="home-page__content">
        {loading ? (
          <img className="preloader" src="/img/preloader.svg" alt="preloader" />
        ) : (
          sortBooks?.map((book, index) => (
            <Book
              key={`${book.id}_${index}`}
              onSelectFavorite={onSelectFavorite}
              {...book}
            />
          ))
        )}
      </div>
      {isModal ? <AddBook setIsModal={setIsModal} /> : null}
    </div>
  );
};
