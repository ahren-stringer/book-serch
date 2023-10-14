import * as React from 'react';
import { useAppDispatch } from '../../state/hooks';

export interface ISelect {
    selectName: string,
    options: string[],
    actionCreator: any
}

const Select: React.FC<ISelect> = ({ selectName, options, actionCreator}) => {

    const optionsView = options.map((item, index) => <option value={item} key={index}>{item}</option>)
    const dispatch = useAppDispatch()

    let onSelectionChange=(e: React.ChangeEvent<HTMLSelectElement>) =>{
        dispatch(actionCreator(e.target.value))
    } 

    return (
        <div>
            <div className='mb-2'>
                {selectName}
            </div>
            <select onChange={(e)=>{onSelectionChange(e)}} className="form-select">
                {optionsView}
            </select>
        </div>
    );
}

export default Select;
