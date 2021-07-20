
import React, { useState } from 'react';

import style from './RadioButton.module.scss';


const RadioButton = ({ disabled, name, id, label, value, onChange }) => {

    const onRadioChange = () => {
        onChange && onChange(id);
    }

    return (
        <div className={`${style.radioWrapper} ${disabled ? style.disabled : ''}`}>
            <input type="radio" name={name} id={id} value={value} className={style.radio} onChange={onRadioChange} disabled={disabled}></input>
            <span className={style.checkmark}></span>
        </div>
    );
};

export default RadioButton;