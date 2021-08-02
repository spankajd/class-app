import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'
import Draggable from 'react-draggable';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { DoubleArrow, ClearScreenIcon, CopyRightIcon, ScreenLockIcon } from '../../elements/Icon/Icon';

import style from './SideControls.module.scss';

const SideControls = ({ id, onItemClick, clearAll, disableClearButton }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownOptions = ['en', 'ger'];
    const { t, i18n } = useTranslation()
    const [selectedOption, setSelectedOption] = useState(i18n.language);

    const onDropdownSelect = e => {
        i18n.changeLanguage(e.value)
    }

    const onTriggerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const onClearAllClick = (e) => {
        if (clearAll) clearAll();
    }

    const onCopyRightClick = () => {
        alert('on Copy rights click');
    }

    const onScreenLockClick = () => {
        alert('onScreenLock');
    }

    const initialPos = { x: 0, y: 0 };

    return (
        <Draggable defaultPosition={initialPos} handle={"." + style.handle} axis="y" defaultClassNameDragging={style.dragging}>
            <div id={id} className={`${style.sideControls} ${isMenuOpen ? style.open : ''}`}>
                <div className={style.trigger} onClick={onTriggerClick}>
                    <div className={style.triggerBG}>
                        <DoubleArrow />
                    </div>
                </div>
                <div className={style.itemWrapper}>
                    <div className={`${style.item} ${style.dropdownWrapper}`}>
                        <div className={style.inner}>
                            <Dropdown options={dropdownOptions} onChange={onDropdownSelect} value={selectedOption} className={style.dropdown} placeholder="Language" />
                        </div>
                    </div>
                    <div className={`${style.item} ${style.copyRight}`} onClick={onCopyRightClick}>
                        <div className={style.inner}>
                            <CopyRightIcon />
                        </div>
                    </div>
                    <div className={`${style.item} ${disableClearButton ? style.disabled : ''}`} onClick={onClearAllClick}>
                        <div className={style.inner}>
                            <ClearScreenIcon />
                        </div>
                    </div>
                    <div className={`${style.item} ${style.screenLock}`} onClick={onScreenLockClick}>
                        <div className={style.inner}>
                            <ScreenLockIcon />
                        </div>
                    </div>
                </div>
            </div >
        </Draggable>
    )
}

export default SideControls;