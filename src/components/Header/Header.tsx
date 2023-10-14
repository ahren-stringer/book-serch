import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import Select from '../Select/Select';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setCat, setSearchStr, setSort } from '../../state/slices/searchSlice';
import SearchInput from '../Input/Input';

const Header: React.FC<IClassNameProps> = ({ className }) => {

    let catOptions = useAppSelector(state => state.search.catsArr)
    let sortOptions = useAppSelector(state => state.search.sortArr)
    let searchStr = useAppSelector(state => state.search.searchStr)

    let dispatch = useAppDispatch()

    const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchStr(e.target.value))
    }

    return (
        <header className={`header ${className}`}>
            <div className="container">
                <div className="header__row mb-5">
                    <h1 className="headline text-center">
                        Search for books
                    </h1>
                </div>
                <div className="header__row mb-4">
                    <SearchInput onCange={onSearchInput} value={searchStr} />
                </div>
                <div className="header__row row row-cols-1 row-cols-sm-2">
                    <div className="col">
                        <Select
                            selectName='Category'
                            options={catOptions}
                            actionCreator={setCat}
                        />
                    </div>
                    <div className="col">
                        <Select
                            selectName='Sort by'
                            options={sortOptions}
                            actionCreator={setSort}
                        />
                    </div>
                </div>

            </div>
        </header>
    );
}

export default Header;
