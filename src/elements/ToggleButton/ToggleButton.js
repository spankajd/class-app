
import React, { useState } from 'react';

import style from './ToggleButton.module.scss';


const ToggleButton = ({ value, onChange }) => {

    const onRadioChange = e => {
        onChange && onChange(e.target.checked);
    }

    return (
        <label className={style.toggle}>
            <input type="checkbox" onChange={onRadioChange} checked={value} />
            <span className={style.slider}></span>
        </label>
    );
};

export default ToggleButton;