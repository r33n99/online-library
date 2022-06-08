import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addBookAction } from '../features/books/booksDataSlice';

const AddBook = ({ setModalOpen }) => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const rootEl = React.useRef(null);

    const onSubmit = (data) => {
        dispatch(addBookAction({ data, id: Math.floor(Math.random() * 1000) }));
        setModalOpen(false);
    };
    console.log(errors);

    const closeModal = (e) => {
        if (!rootEl.current.contains(e.target)) {
            setModalOpen(false);
        }
    };
    return (
        <div onClick={(e) => closeModal(e)} className="add-book">
            <form ref={rootEl} onSubmit={handleSubmit(onSubmit)}>
                <div>{errors?.name && <p>{errors?.name?.message || 'Error'}</p>}</div>
                <input
                    type="text"
                    placeholder="Название"
                    {...register('name', {
                        required: 'Обязательное поле',
                        maxLength: 80,
                    })}
                />
                <div>{errors?.category && <p>{errors?.category?.message || 'Error'}</p>}</div>
                <input
                    type="text"
                    placeholder="Жанр"
                    {...register('category', {
                        required: 'Обязательное поле',
                        maxLength: 100,
                    })}
                />
                <div>{errors?.author && <p>{errors?.author?.message || 'Error'}</p>}</div>
                <input type="text" placeholder="Автор" {...register('author', { required: 'Обязательное поле' })} />
                <input type="text" placeholder="Ссылка на картинку" {...register('image', { required: false })} />
                <input type="submit" value="добавить" />
            </form>
        </div>
    );
};

export default AddBook;
