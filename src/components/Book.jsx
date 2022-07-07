import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookAction, editBookAction } from '../features/books/booksDataSlice';
import { deleteFavoritesBookAction, selectFavorites } from '../features/favorites/favoritesSlise';
import { Link } from 'react-router-dom';
import noImage from "../assets/images/no-image.jpg";
export const Book = ({ id, clickAddFavorite, volumeInfo }) => {
    const author = volumeInfo.authors?.join('');
    const image = volumeInfo.imageLinks?.thumbnail;
    const genre = volumeInfo.categories;
    const title = volumeInfo.title;
    const toBuy = volumeInfo?.infoLink;

    const { favorites } = useSelector(selectFavorites);

    const [editMode, setEditMode] = React.useState(false);
    const [editNameBook, setEditNameBook] = React.useState(title);
    const [editGenreBook, setEditGenreBook] = React.useState(genre);
    const [editAuthorBook, setEditAuthorBook] = React.useState(author);

    const dispatch = useDispatch();
    const navigate = window.location.pathname === '/favorites';

    const getFavoriteBookId = (idFavBook) => {
        navigate ? dispatch(deleteFavoritesBookAction(idFavBook)) : clickAddFavorite(idFavBook);
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
            <div className="book__img">
                 <img src={image ? image : noImage} alt={title} />
                 <div onClick={() => getFavoriteBookId(id)}>
                    {favorites.includes(id) ? (
                        <StarIcon className="btn-group__favorite active" />
                    ) : (
                        <StarBorderIcon className="btn-group__favorite" />
                    )}
                </div>
            </div>
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
                        <strong>Название:</strong> {title}
                    </h3>
                     <div className="book__btn-group">
                        {navigate ? (
                            <a className="btn-group__buy-book" href={toBuy} target="_blank" rel="noreferrer">Купить</a>
                        )  :  <Link to={`book/${id}`}>
                        <div className="btn-group__info">Подробнее</div>
                    </Link> }
                   
            </div>
                </div>
            )}
           
        </div>
    );
};
