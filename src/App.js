import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataBooks } from './features/books/booksDataSlice';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { WishList } from './pages/WishList';
import { Routes, Route } from 'react-router-dom';
import { selectSort } from './features/sort/sortSlice';

function App() {
    const dispatch = useDispatch();

    const { sort } = useSelector(selectSort);

    React.useEffect(() => {
        dispatch(getDataBooks(sort));
    }, [dispatch, sort]);

    return (
        <div className="wrapper">
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route exact path="/favorites" element={<WishList />} />
            </Routes>
        </div>
    );
}

export default App;
