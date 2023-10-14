import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { searchBooks } from '../../state/slices/searchSlice';
import './Input.css'

interface ISearchInputProps extends IClassNameProps{
 onCange: Function,
 value: string
}

const SearchInput: React.FC<ISearchInputProps> = ({ className, onCange, value }: ISearchInputProps) => {

    let dispatch = useAppDispatch()

    let category = useAppSelector(state => state.search.cat)
    let sort = useAppSelector(state => state.search.sort)
    let paginationStep = useAppSelector(state => state.search.paginationStep)

    function firstRequest() {
        dispatch(searchBooks({
            searchStr: value,
            category,
            sort,
            pageNumber: 0,
            paginationStep
        }))
    }

    const onBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        firstRequest()
    }

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value) {
            firstRequest()
        }
    }

    return (

        <form className="form header__search-form">
            <div className="input">
                <div className="input__search">
                    <input
                        onChange={(e) => { onCange(e) }}
                        onKeyPress={(e) => { onEnter(e) }}
                        value={value}
                        type="text"
                        className="input--search"
                        name="search"
                        placeholder="Search..." />

                    <button
                        onClick={(e) => { onBtnClick(e) }}
                        className="button button--search"
                        disabled={!value || false}
                        name='search-btn'
                    >
                        <svg className="icon icon--search" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17 17L12.0962 12.0962M12.0962 12.0962C13.2725 10.9199 14 9.29493 14 7.5C14 3.91015 11.0899 1 7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14C9.29493 14 10.9199 13.2725 12.0962 12.0962Z"
                                stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </form>

    );
}

export default SearchInput;
