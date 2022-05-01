import React from "react";
import { useSelector } from "react-redux";

export const Categories = ({ sortBooksByCategory }) => {
  const { category } = useSelector((state) => state.books);

  const onClickCategory = (el) => {
    sortBooksByCategory(el.target.value);
  };

  return (
    <div className="categories">
      <select onChange={(e) => onClickCategory(e)} name="sort">
        {category.map((el, index) => (
          <option key={`${el}_${index}`} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};
