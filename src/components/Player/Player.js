import React, { useState } from 'react';
import { Dice, DownArrow, SymbolIcon } from '../../elements/Icon/Icon';

import style from './Player.module.scss';

 const Player = ({ onItemClick }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(true);


    const onMenuTriggerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const onMenuItemClick = (e) => {
        onItemClick(e.currentTarget.dataset.id);
    }

    return (
        <div className={style.menu}>
            
            <div className={`${style.menuWrapper} ${ isMenuOpen ? style.open : ''}`}>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="symbols">
                            <div className={style.menuItemLabel}>
                                <span>symbols</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <SymbolIcon className={style.icon}></SymbolIcon>
                            </span>
                    </button>
                </div>
                
                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="number">
                            <div className={style.menuItemLabel}>
                                <span>number</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Dice className={style.icon}></Dice>
                            </span>
                    </button>
                </div>
                
            </div>

            <div className={style.menuTriggerWrapper}>
                <button className={`${style.menuTrigger} ${!isMenuOpen ? style.open : ''}`} onClick={onMenuTriggerClick}>
                    <DownArrow></DownArrow>
                </button>
            </div>
        </div>
    )
}

export default Player;