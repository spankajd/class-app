
import React, { useState } from 'react';
import { Dice } from '../Icon/Icon';

import style from './Tile.module.scss';


const Tile = ({ icon, label, isActive=false }) => {

    const [isActiveFlag, setIsActiveFlag] = useState(isActive);

    const onButtonClick = () => {
        setIsActiveFlag(!isActiveFlag);
    }

    return (
        <div className={`${style.tile} ${isActiveFlag ? style.active : ''}`}>
            <button className={style.tileButton} onClick={onButtonClick}>
                <Dice></Dice>
                <div className={style.tileLabel}>{label}</div>
            </button>
        </div>
    );
};

export default Tile;