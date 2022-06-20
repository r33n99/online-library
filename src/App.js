import React, { Suspense } from 'react';
import { Home } from './pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

function App() {

    const WishList = React.lazy(() => import(/* webpackChunkName: "WishList" */ './pages/WishList'));
    const FullBook = React.lazy(() => import(/* webpackChunkName: "FullBook" */ './pages/FullBook'));
    
    return (
        <>
            <Suspense fallback={<div>Идет загрузка...</div>}>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="favorites" element={<WishList />} />
                        <Route path="book/:id" element={<FullBook />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
