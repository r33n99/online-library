import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullBook = () => {
    const [book, setBook] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const { name, author, image } = book;

    React.useEffect(() => {
        const getBook = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://6149965f07549f001755a467.mockapi.io/books/${id}`);
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
                        <img src={image} alt={name} className="fullBook__image" />
                        <div className="fullBook__info">
                            <h1 className="fullBook__title text">
                                <strong>Название:</strong> {name}
                            </h1>
                            <p className="fullBook__author text">
                                <strong>Автор:</strong> {author}
                            </p>
                            <p className="fullBook__description text"><strong>Описание:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus doloremque ullam cumque autem nesciunt nihil id veritatis dolores pariatur asperiores error qui, unde aliquam minus porro quibusdam voluptatibus at eius. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ut nihil, veritatis fugiat quae modi provident architecto omnis exercitationem sint debitis eveniet a pariatur laborum vel. Ut itaque voluptas dolores</p>
                            <div className="fullBook__button"  onClick={comeBack}>
                                Назад
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FullBook;
