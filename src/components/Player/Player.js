import React, { useState } from 'react';
import * as Icon from '../../elements/Icon/Icon';

import style from './Player.module.scss';

const Player = ({ openedItems, onItemClick, onScreenCapture }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(true);


    const onMenuTriggerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const onMenuItemClick = (e) => {
        onItemClick(e.currentTarget.dataset.id);
    }

    return (
        <div className={style.menu}>

            <div className={`${style.menuWrapper} ${isMenuOpen ? style.open : ''}`}>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="symbols">
                        <div className={style.menuItemLabel}>
                            <span>symbols</span>
                        </div>
                        <span className={style.menuItemContent}>
                            <Icon.IconSymbol className={style.icon}></Icon.IconSymbol>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="teacher">
                        <div className={style.menuItemLabel}>
                            <span>teacher</span>
                        </div>
                        <span className={style.menuItemContent}>
                            <Icon.IconTeacher className={style.icon}></Icon.IconTeacher>
                        </span>
                    </button>
                </div>
            </div>

            <div className={`${style.menuWrapper} ${isMenuOpen ? style.open : ''}`}>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="whoisnext">
                        <div className={style.menuItemLabel}>
                            <span>who is next?</span>
                        </div>
                        <span className={style.menuItemContent}>
                            <Icon.IconWhoIsNext className={style.icon}></Icon.IconWhoIsNext>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="groupbuilder">
                        <div className={style.menuItemLabel}>
                            <span>group builder</span>
                        </div>
                        <span className={style.menuItemContent}>
                            <Icon.IconGroupBuilder className={style.icon}></Icon.IconGroupBuilder>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="noiselevel">
                        <div className={style.menuItemLabel}>
                            <span>noise level</span>
                        </div>
                        <span className={style.menuItemContent}>
                            <Icon.IconNoiseLevel className={style.icon}></Icon.IconNoiseLevel>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="timer">
                        <div className={style.menuItemLabel}>
                            <span>timer</span>
                        </div>
                        <span className={style.menuItemContent}>
                            <Icon.IconTimer className={style.icon}></Icon.IconTimer>
                        </span>
                    </button>
                </div>
            </div>

            <div className={`${style.menuWrapper} ${isMenuOpen ? style.open : ''}`}>
                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="text">
                        <div className={style.menuItemLabel}>
                            <span>text</span>
                        </div>
                        <span className={style.menuItemContent}>
                            <Icon.IconEasyText className={style.icon}></Icon.IconEasyText>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="number">
                        <div className={style.menuItemLabel}>
                            <span>number</span>
                        </div>
                        <span className={style.menuItemContent}>
                            <Icon.IconNumber className={style.icon}></Icon.IconNumber>
                        </span>
                    </button>
                </div>
            </div>

            <div className={`${style.menuWrapper} ${isMenuOpen ? style.open : ''}`}>
                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="webcam">
                        <div className={style.menuItemLabel}>
                            <span>webcan</span>
                        </div>
                        <span className={style.menuItemContent}>
                            <Icon.IconWebCam className={style.icon}></Icon.IconWebCam>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="qrcode">
                        <div className={style.menuItemLabel}>
                            <span>qr code</span>
                        </div>
                        <span className={style.menuItemContent}>
                            <Icon.IconQRCode className={style.icon}></Icon.IconQRCode>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onScreenCapture} data-id="postbox">
                        <div className={style.menuItemLabel}>
                            <span>postbox</span>
                        </div>
                        <span className={style.menuItemContent}>
                            <Icon.IconPostbox className={style.icon}></Icon.IconPostbox>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="background">
                        <div className={style.menuItemLabel}>
                            <span>background</span>
                        </div>
                        <span className={style.menuItemContent}>
                            <Icon.IconBackground className={style.icon}></Icon.IconBackground>
                        </span>
                    </button>
                </div>

            </div>
            <div className={`${style.menuTriggerWrapper} ${!isMenuOpen ? style.open : ''}`}>
                <div className={`${style.menuTriggerContainer}`}>
                    <button className={`${style.menuTrigger}`} onClick={onMenuTriggerClick}>
                        <Icon.DownArrow></Icon.DownArrow>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Player;