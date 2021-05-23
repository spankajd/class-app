
import React from 'react';

import style from './TimeUnit.module.scss';


const TimeUnit = ({ num = 0, editMode = true, onChange={onChange}, factorSec }) => {
    
    return (
        <div className={`${style.timeUnit}`}>
            <div className={`${style.container}`}>
                <button type="button" className={`${style.button} ${editMode ? style.active : ''} ${style.increament}`} onClick={e => onChange(factorSec)}>
                    +
                </button>
                <div className={`${style.number}`}>
                    {num}
                </div>
                <button type="button" className={`${style.button} ${editMode ? style.active : ''} ${style.increament}`} onClick={e => onChange(-factorSec)}>
                    -
                </button>
            </div>
        </div>
    );
};

export default TimeUnit;
