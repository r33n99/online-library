import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullBook = () => {
    const [book, setBook] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(book);
    const { volumeInfo } = book;

    const author = volumeInfo?.authors?.join('');
    const image = volumeInfo?.imageLinks?.thumbnail;
    const description = volumeInfo?.description;
    const title = volumeInfo?.title;
    const toBuy = volumeInfo?.infoLink;
    const categories = volumeInfo?.categories?.join('');
    const publisher = volumeInfo?.publisher;
    const publishedDate = volumeInfo?.publishedDate;
    const pageCount = volumeInfo?.pageCount;
    // console.log(title)
    React.useEffect(() => {
        const getBook = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
                setBook(data);
                setLoading(false);
            } catch (error) {
                alert(error);
                setLoading(false);
            }
        };
        getBook();
    }, [id]);

    const comeBack = () => {
        navigate('/');
    };

    return (
        <div className="fullBook">
            {loading ? (
                <div>Загрузка...</div>
            ) : (
                <>
                    <div className="fullBook__content">
                        <div className="fullBook__info">
                            <img src={image} alt={title} className="fullBook__image" />
                            <h1 className="fullBook__title text">
                                <strong>Название:</strong> {title}
                            </h1>
                            {categories && (
                                <h2>
                                    <strong>Жанр:</strong> {categories}
                                </h2>
                            )}
                            <p className="fullBook__author text">
                                <strong>Автор:</strong> {author}
                            </p>
                            <p>
                                <strong>Издатель:</strong> {publisher}
                            </p>
                            {publishedDate && (
                                <p>
                                    <strong>Дата издания:</strong> {publishedDate}
                                </p>
                            )}
                            <p>
                                <strong>кол-во страниц:</strong> {pageCount}
                            </p>
                            {description && (
                                <p className="fullBook__description text">
                                    <strong>Описание:</strong> {description}
                                </p>
                            )}
                            <div className="fullBook__btn-group">
                                <a href={toBuy} alt={title} rel="noreferrer" target="_blank">
                                    Купить
                                </a>
                                <button className="fullBook__button" onClick={comeBack}>
                                    Назад
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FullBook;
