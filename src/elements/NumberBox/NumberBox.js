
import React from 'react';

import style from './NumberBox.module.scss';


const NumberBox = ({ num=0 }) => {

    return (
        <div className={`${style.numberBox}`}>{num}</div>
    );
};

export default NumberBox;