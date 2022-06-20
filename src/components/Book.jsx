import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookAction, editBookAction } from '../features/books/booksDataSlice';
import { deleteFavoritesBookAction, selectFavorites } from '../features/favorites/favoritesSlise';
import { Link, useParams } from 'react-router-dom';

export const Book = ({ name, genre, image, author, id, clickAddFavorite }) => {
    const { favorites } = useSelector(selectFavorites);
    const [editMode, setEditMode] = React.useState(false);
    const [editNameBook, setEditNameBook] = React.useState(name);
    const [editGenreBook, setEditGenreBook] = React.useState(genre);
    const [editAuthorBook, setEditAuthorBook] = React.useState(author);
    const dispatch = useDispatch();
    const navigate = window.location.pathname === '/favorites'
    const getFavoriteBookId = (idFavBook) => {
      navigate
            ? dispatch(deleteFavoritesBookAction(idFavBook))
            : clickAddFavorite(idFavBook);
    };

    const handleDeleteBook = (idBook) => {
        // Удаление книги
        dispatch(deleteBookAction(idBook));
        dispatch(deleteFavoritesBookAction(idBook));
    };

    const activeEditMode = () => {
        // Активация режима редактирования
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
            }),
        );
        setEditMode(false);
        e.preventDefault();
    };

    return (
        <div className="book">
            <Link to={`book/${id}`}>
            <img className="book__img" src={image} alt={name} />
            </Link>
            {editMode ? (
                <div className="book__edit-mode">
                    <form autoFocus={true}>
                        <input
                            type="text"
                            placeholder="Название"
                            onChange={(e) => setEditNameBook(e.target.value)}
                            value={editNameBook}
                            name="name"
                        />
                        <input
                            type="text"
                            placeholder="Жанр"
                            onChange={(e) => setEditGenreBook(e.target.value)}
                            value={editGenreBook}
                            name="genre"
                        />
                        <input
                            type="text"
                            placeholder="Автор"
                            onChange={(e) => setEditAuthorBook(e.target.value)}
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
                        <strong>Жанр:</strong> {genre}
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
                {navigate ? null : (
                    <button className="btn-group__delete-book" onClick={() => handleDeleteBook(id)}>
                        Удалить
                    </button>
                )}
            </div>
        </div>
    );
};
