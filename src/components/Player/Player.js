import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'
import * as Icon from '../../elements/Icon/Icon';

import style from './Player.module.scss';

const Player = ({ id, openedItems, onItemClick, onScreenCapture }) => {

    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onMenuTriggerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const onMenuItemClick = (e) => {
        onItemClick(e.currentTarget.dataset.id);
    }

    const onPostBoxClick = e => {
        onScreenCapture && onScreenCapture();
    }

    return (
        <div id={id} className={style.menu}>

            <div className={`${style.menuWrapper} ${isMenuOpen ? style.open : ''}`}>

                <div className={style.menuItemWrapper}>
                    <div className={style.menuItemContainer}>
                        <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="symbols">
                            <div className={style.menuItemLabel}>
                                <span>{t('widgetbar.symbols')}</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Icon.IconSymbol className={style.icon}></Icon.IconSymbol>
                            </span>
                        </button>
                    </div>
                </div>

                <div className={style.menuItemWrapper}>
                    <div className={style.menuItemContainer}>
                        <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="teacher">
                            <div className={style.menuItemLabel}>
                                <span>{t('widgetbar.teacher')}</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Icon.IconTeacher className={style.icon}></Icon.IconTeacher>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${style.menuWrapper} ${isMenuOpen ? style.open : ''}`}>

                <div className={style.menuItemWrapper}>
                    <div className={style.menuItemContainer}>
                        <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="whoisnext">
                            <div className={style.menuItemLabel}>
                                <span>{t('widgetbar.whoisnext')}</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Icon.IconWhoIsNext className={style.icon}></Icon.IconWhoIsNext>
                            </span>
                        </button>
                    </div>
                </div>

                <div className={style.menuItemWrapper}>
                    <div className={style.menuItemContainer}>
                        <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="groupbuilder">
                            <div className={style.menuItemLabel}>
                                <span>{t('widgetbar.groupbuilder')}</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Icon.IconGroupBuilder className={style.icon}></Icon.IconGroupBuilder>
                            </span>
                        </button>
                    </div>
                </div>

                <div className={style.menuItemWrapper}>
                    <div className={style.menuItemContainer}>
                        <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="noiselevel">
                            <div className={style.menuItemLabel}>
                                <span>{t('widgetbar.noiselevel')}</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Icon.IconNoiseLevel className={style.icon}></Icon.IconNoiseLevel>
                            </span>
                        </button>
                    </div>
                </div>

                <div className={style.menuItemWrapper}>
                    <div className={style.menuItemContainer}>
                        <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="timer">
                            <div className={style.menuItemLabel}>
                                <span>{t('widgetbar.timer')}</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Icon.IconTimer className={style.icon}></Icon.IconTimer>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${style.menuWrapper} ${isMenuOpen ? style.open : ''}`}>
                <div className={style.menuItemWrapper}>
                    <div className={style.menuItemContainer}>
                        <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="text">
                            <div className={style.menuItemLabel}>
                                <span>{t('widgetbar.easytext')}</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Icon.IconEasyText className={style.icon}></Icon.IconEasyText>
                            </span>
                        </button>
                    </div>
                </div>

                <div className={style.menuItemWrapper}>
                    <div className={style.menuItemContainer}>
                        <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="number">
                            <div className={style.menuItemLabel}>
                                <span>{t('widgetbar.number')}</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Icon.IconNumber className={style.icon}></Icon.IconNumber>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${style.menuWrapper} ${isMenuOpen ? style.open : ''}`}>
                <div className={style.menuItemWrapper}>
                    <div className={style.menuItemContainer}>
                        <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="webcam">
                            <div className={style.menuItemLabel}>
                                <span>{t('widgetbar.webcam')}</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Icon.IconWebCam className={style.icon}></Icon.IconWebCam>
                            </span>
                        </button>
                    </div>
                </div>

                <div className={style.menuItemWrapper}>
                    <div className={style.menuItemContainer}>
                        <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="qrcode">
                            <div className={style.menuItemLabel}>
                                <span>{t('widgetbar.qrcode')}</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Icon.IconQRCode className={style.icon}></Icon.IconQRCode>
                            </span>
                        </button>
                    </div>
                </div>

                <div className={style.menuItemWrapper}>
                    <div className={style.menuItemContainer}>
                        <button type="button" className={style.menuItem} onClick={onPostBoxClick} data-id="postbox">
                            <div className={style.menuItemLabel}>
                                <span>{t('widgetbar.postbox')}</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Icon.IconPostbox className={style.icon}></Icon.IconPostbox>
                            </span>
                        </button>
                    </div>
                </div>

                <div className={style.menuItemWrapper}>
                    <div className={style.menuItemContainer}>
                        <button type="button" className={style.menuItem} onClick={onMenuItemClick} data-id="background">
                            <div className={style.menuItemLabel}>
                                <span>{t('widgetbar.background')}</span>
                            </div>
                            <span className={style.menuItemContent}>
                                <Icon.IconBackground className={style.icon}></Icon.IconBackground>
                            </span>
                        </button>
                    </div>
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