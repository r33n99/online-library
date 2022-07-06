import debounce from 'lodash.debounce';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooks, setSearchTermAction } from '../features/books/booksDataSlice';

export const Search = () => {
    const dispatch = useDispatch();
    const inputRef = React.useRef(null);
    const { searchTerm } = useSelector(selectBooks);
    const [searchValue, setSearchValue] = React.useState(searchTerm);

    const onClickClear = () => {
        setSearchValue('');
        inputRef.current?.focus();
    };

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            dispatch(setSearchTermAction(str));
        }, 1000),
        [],
    );

    const handleSearchValue = (e) => {
        setSearchValue(e.target.value);
        updateSearchValue(e.target.value);
    };

    return (
        <div className="search">
            <input
                className="search"
                ref={inputRef}
                type="text"
                value={searchValue}
                placeholder="поиск книг..."
                onChange={handleSearchValue}
            />
            {searchValue ? (
                <svg
                    onClick={onClickClear}
                    className="search__icon"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
            ) : (
                ''
            )}
        </div>
    );
};
