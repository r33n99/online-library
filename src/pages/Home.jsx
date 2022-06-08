import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddBook from '../components/AddBook';
import { Book } from '../components/Book';
import Skeleton from '../components/Skeleton';
import { Sort } from '../components/Sort';
import { selectBooks } from '../features/books/booksDataSlice';
import { selectFavorites, setFavoriteBookAction } from '../features/favorites/favoritesSlise';
import { selectSort } from '../features/sort/sortSlice';

export const Home = () => {

    const { books, loading } = useSelector(selectBooks);
    const { sort } = useSelector(selectSort);
    const { favorites } = useSelector(selectFavorites);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectFavoriteBook, setSelectFavoriteBook] = React.useState(favorites);
    const dispatch = useDispatch();
    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

    React.useEffect(() => {
        dispatch(setFavoriteBookAction(selectFavoriteBook))
    }, [selectFavoriteBook, dispatch]);

    const clickAddFavorite = (id) => {
        setSelectFavoriteBook(
            (prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])
        );
    };
    return (
        <div className="home-page container">
            <div className="home-page__header">
                <button onClick={() => setModalOpen(!modalOpen)}>Добавить книгу</button>
                <Sort value={sort} />
            </div>
            <div className="home-page__content">
                {loading ? (
                    skeletons
                ) : (
                    books.map((book, index) => (
                        <Book clickAddFavorite={clickAddFavorite} key={`${book.id}_${index}`} {...book} />
                    ))
                )}
            </div>
            {modalOpen ? <AddBook setModalOpen={setModalOpen} /> : null}
        </div>
    );
};
