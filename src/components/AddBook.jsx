import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addBookAction } from "../features/books/booksDataSlice";

const AddBook = ({ setIsModal }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const rootEl = React.useRef(null);
  const onSubmit = (data) => {
    dispatch(addBookAction(data));
    setIsModal(false);
  };
  console.log(errors);

  const closeModal = (e) => {
    if (!rootEl.current.contains(e.target)) {
      setIsModal(false);
    }
  };
  return (
    <div onClick={(e) => closeModal(e)} className="add-book">
      <form ref={rootEl} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Название"
          {...register("name", { required: true, maxLength: 80 })}
        />
        <input
          type="text"
          placeholder="Жанр"
          {...register("category", { required: true, maxLength: 100 })}
        />
        <input
          type="text"
          placeholder="Автор"
          {...register("author", { required: true })}
        />
        <input
          type="text"
          placeholder="Ссылка на картинку"
          {...register("image", { required: true })}
        />
        <input type="submit" value="добавить" />
      </form>
    </div>
  );
};

export default AddBook;
