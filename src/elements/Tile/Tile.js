
import React, { useState } from 'react';
import { Dice } from '../Icon/Icon';

import style from './Tile.module.scss';


const Tile = ({ icon, label, isActive=false }) => {

    const [isActiveFlag, setIsActiveFlag] = useState(isActive);

    const onButtonClick = () => {
        setIsActiveFlag(!isActiveFlag);
    }

    return (
        <div className={`${style.tile} ${isActiveFlag ? style.active : ''}`} onClick={onButtonClick}>
            <button className={style.tileButton}>
                <Dice></Dice>
                <div className={style.tileLabel}>{label}</div>
            </button>
        </div>
    );
};

export default Tile;