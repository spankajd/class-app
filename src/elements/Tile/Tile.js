
import React, { useState } from 'react';

import style from './Tile.module.scss';


const Tile = ({ disabled, label, isActive = false, id, children, onClick }) => {

    const [isActiveFlag, setIsActiveFlag] = useState(isActive);
    
    const onButtonClick = () => {
        setIsActiveFlag(!isActiveFlag);
        onClick(id);
    }
    
    return (
        <div className={`${style.tile} ${isActiveFlag ? style.active : ''} ${disabled ? style.disabled : ''}`} onClick={onButtonClick}>
            <button className={style.tileButton}>
                {children}
            </button>
            <div className={style.tileLabel}>{label}</div>
        </div>
    );
};

export default Tile;