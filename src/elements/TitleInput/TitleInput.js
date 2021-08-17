
import React, { useState } from 'react';

import style from './TitleInput.modules.scss';


const TitleInput = ({ defaultVal='', onChange, className }) => {

    const [value, setValue] = useState(defaultVal);

    const onInputChange = e => {
        const val = e.target.value;
        setValue(val);
        onChange && onChange(val);
    }

    const onMouseDown = e => {
        e.stopPropagation();
    } 

    return (
        <input className={`${style.titleInput} ${className}`} type="type" onChange={onInputChange} value={value} onMouseDown={onMouseDown} />
    );
};

export default TitleInput;