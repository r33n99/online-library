import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Book, AddBook } from '../components';
import { Search } from '../components/Search';
import { getDataBooks, selectBooks } from '../features/books/booksDataSlice';
import { selectFavorites, setFavoriteBookAction } from '../features/favorites/favoritesSlise';

export const Home = () => {
    const { books, loading,searchTerm } = useSelector(selectBooks);
    const { favorites } = useSelector(selectFavorites);
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectFavoriteBook, setSelectFavoriteBook] = React.useState(favorites);

    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

    const isMounted = React.useRef(false);

    // console.log(searchValue)
    React.useEffect(() => {
        dispatch(getDataBooks(searchTerm));
    }, [dispatch, searchTerm]);

    React.useEffect(() => {
        if (isMounted.current) {
            localStorage.setItem('books', JSON.stringify(books));
            console.log('Книги записаны в localStorage');
        }
    }, []);

    React.useEffect(() => {
        dispatch(setFavoriteBookAction(selectFavoriteBook));
    }, [selectFavoriteBook, dispatch]);

    const clickAddFavorite = React.useCallback((id) => {
        console.log('render funct');
        setSelectFavoriteBook((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    }, []);

    return (
        <div className="home-page container">
            <div className="home-page__header">
            </div>
            <div ref={isMounted} className="home-page__content">
                {loading
                    ? skeletons
                    : books?.map((book) => (
                          <Book clickAddFavorite={clickAddFavorite} key={book.id} {...book} />
                      ))}
            </div>
            {modalOpen ? <AddBook setModalOpen={setModalOpen} /> : null}
        </div>
    );
};
