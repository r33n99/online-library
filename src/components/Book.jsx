import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBookAction,
  deleteFavoritesBookAction,
  editBookAction,
} from "../features/books/booksDataSlice";

export const Book = (props) => {
  const { name, category, image, author, id, onSelectFavorite, isWishList } =
    props;
  const { favorites } = useSelector((state) => state.books);
  const [editMode, setEditMode] = React.useState(false);
  const [editNameBook, setEditNameBook] = React.useState(name);
  const [editGenreBook, setEditGenreBook] = React.useState(category);
  const [editAuthorBook, setEditAuthorBook] = React.useState(author);
  const dispatch = useDispatch();

  const getFavoriteBookId = (idFavBook) => {  // получаем id избранной книги
    onSelectFavorite(idFavBook);
  };

  const handleDeleteBook = (idBook) => {  // Удаление книги
    dispatch(deleteBookAction(idBook));
    dispatch(deleteFavoritesBookAction(idBook));
  };

  const activeEditMode = () => {  // Активация режима редактирования
    setEditMode(true);
  };

  const handleSubmit = (e) => { 
    dispatch(
      editBookAction({
        id: id,
        name: editNameBook,
        category: editGenreBook,
        author: editAuthorBook,
        image: image,
      })
    );
    setEditMode(false);
    e.preventDefault();
  };

  return (
    <div className="book">
      <img className="book__img" src={image} alt={name} />
      {editMode ? (
        <div className="book__edit-mode">
          <form autoFocus={true}>
            <input
              type="text"
              placeholder="Название"
              onChange={(e)=> setEditNameBook(e.target.value)}
              value={editNameBook}
              name="name"
            />
            <input
              type="text"
              placeholder="Жанр"
              onChange={(e)=> setEditGenreBook(e.target.value)}
              value={editGenreBook}
              name="genre"
            />
            <input
              type="text"
              placeholder="Автор"
              onChange={(e)=> setEditAuthorBook(e.target.value)}
              value={editAuthorBook}
              name="author"
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Изменить
            </button>
          </form>
        </div>
      ) : (
        <div className="book__info">
          <h3 onDoubleClick={activeEditMode} className="book__title">
            <strong>Название:</strong> {name}
          </h3>
          <p className="book__category">
            <strong>Жанр:</strong> {category}
          </p>
          <p className="book__author">
            <strong>Автор:</strong> {author}
          </p>
        </div>
      )}
      <div className="book__btn-group">
        <div onClick={() => getFavoriteBookId(id)}>
          {favorites.includes(id) ? (
            <StarIcon className="btn-group__favorite active" />
          ) : (
            <StarBorderIcon className="btn-group__favorite" />
          )}
        </div>
        {isWishList ? null : (
          <button
            className="btn-group__delete-book"
            onClick={() => handleDeleteBook(id)}
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
};
