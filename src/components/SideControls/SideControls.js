import React, { useState } from 'react';
import Draggable from 'react-draggable';

import { DownArrow, ClearScreenIcon, CopyRightIcon, ScreenLockIcon } from '../../elements/Icon/Icon';

import style from './SideControls.module.scss';

const SideControls = ({ onItemClick, clearAll }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const onTriggerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const onClearAllClick = (e) => {
        if (clearAll) clearAll();
    }

    const onScreenLockClick = () => {
        alert('onScreenLock');
    }

    const initialPos = { x: 0, y: 0 };

    return (
        <Draggable defaultPosition={initialPos} handle={"." + style.handle} axis="y" defaultClassNameDragging={style.dragging}>
            <div className={`${style.sideControls} ${isMenuOpen ? style.open : ''}`}>
                <div className={style.trigger} onClick={onTriggerClick}>
                    <div className={style.triggerBG}>
                        <DownArrow />
                    </div>
                </div>
                <div className={style.itemWrapper}>
                    <div className={`${style.item} ${style.copyRight}`} onClick={onClearAllClick}>
                        <CopyRightIcon />
                    </div>
                    <div className={style.item} onClick={onClearAllClick}>
                        <ClearScreenIcon />
                    </div>
                    <div className={`${style.item} ${style.screenLock}`} onClick={onScreenLockClick}>
                        <ScreenLockIcon />
                    </div>
                </div>
            </div >
        </Draggable>
    )
}

export default SideControls;