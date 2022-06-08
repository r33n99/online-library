import React from 'react';
import { useSelector } from 'react-redux';
import { Book } from '../components/Book';
import { selectBooks } from '../features/books/booksDataSlice';
import { selectFavorites } from '../features/favorites/favoritesSlise';

export const WishList = () => {
    const { favorites } = useSelector(selectFavorites);
    const { books } = useSelector(selectBooks);
    return (
        <div className="wish-list container">
            <div className="wish-list__content">
                {favorites.length > 0 ? (
                    books.map((book) =>
                        favorites.map((fav, index) =>
                            book.id === fav ? (
                                <Book
                                    key={`${fav}_${index}`}
                                    {...book}
                                />
                            ) : null,
                        ),
                    )
                ) : (
                    <div className="wish-list__no-content">Отсутствуют какие-либо книги в избранных 😦</div>
                )}
            </div>
        </div>
    );
};
