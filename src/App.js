import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataBooks,
  setFavoriteBookAction,
} from "./features/books/booksDataSlice";
import { Header } from "./components/Header";
import { Home } from "./page/Home";
import { WishList } from "./page/WishList";
import { Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { books, favorites } = useSelector((state) => state.books);
  const [sortBooks, setSortBooks] = React.useState([]);
  const [favoritesBooks, setFavoritesBooks] = React.useState(favorites);

  React.useEffect(() => {
    dispatch(setFavoriteBookAction(favoritesBooks));  // при изменении коллекции избранных книг обновляем их в локальном хранилище
    localStorage.setItem("favoritesBooks", JSON.stringify(favoritesBooks)); // при изменении коллекции избранных книг обновляем их в локальном хранилище
  }, [favoritesBooks, dispatch]);

  React.useEffect(() => {
   localStorage.getItem("books") ? setSortBooks(JSON.parse(localStorage.getItem("books"))) : dispatch(getDataBooks()); 
  }, [dispatch]);

  const onSelectFavorite = (id) => {
    setFavoritesBooks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id] // добавляем или удаляем из избранного
    );
  };

  const sortBooksByCategory = (category) => {
    const newBooks = books.concat();  // копируем массив книг
    if (category === "Все") {
      setSortBooks(books);
    } else if (category === "По названию") {
      setSortBooks(newBooks.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } else if (category === "По жанру") {
      setSortBooks(newBooks.sort((a, b) => (a.category > b.category ? 1 : -1)));
    } else if (category === "По автору") {
      setSortBooks(newBooks.sort((a, b) => (a.author > b.author ? 1 : -1)));
    } else {
      return newBooks;  // если не найдено выводим все книги
    }
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              setFavoritesBooks={setFavoritesBooks}
              setSortBooks={setSortBooks}
              sortBooks={sortBooks}
              sortBooksByCategory={sortBooksByCategory}
              onSelectFavorite={onSelectFavorite}
            />
          }
        />
        <Route
          path="/wishList"
          element={
            <WishList
              setFavoritesBooks={setFavoritesBooks}
              setSortBooks={setSortBooks}
              sortBooks={sortBooks}
              sortBooksByCategory={sortBooksByCategory}
              onSelectFavorite={onSelectFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
