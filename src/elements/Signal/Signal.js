
import React, { useEffect, useState } from 'react';

import style from './Signal.module.scss';


const Singal = ({ color, isActive = false, onSignalClick }) => {

    // const [isActiveFlag, setIsActiveFlag] = useState(isActive);
    const [curColor, setCurColor] = useState('');

    useEffect(() => {

        setCurColor(
            color === 'red' ? style.red :
                color === 'yellow' ? style.yellow :
                    color === 'green' ? style.green : ''
        )

    }, []);

    const onButtonClick = () => {
        // setIsActiveFlag(!isActiveFlag);
        onSignalClick(color);
    }

    return (<div className={`${style.signal} ${curColor} ${isActive ? style.active : ''}`} onClick={onButtonClick}></div>);
};

export default Singal;