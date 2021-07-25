
import React, { useState } from 'react';
import i18n from '../../i18n';

import Holder from '../../elements/Holder/Holder';
import Signal from '../../elements/Signal/Signal';

import style from './Teacher.module.scss';

/**
 * Primary UI component for user interaction
 */

const RED = 'red';
const YELLOW = 'yellow';
const GREEN = 'green';

const Teacher = ({ onCompClick, onCompClose }) => {

    const [isRedActive, setIsRedActive] = useState(false);
    const [isYellowActive, setIsYellowActive] = useState(false);
    const [isGreenActive, setIsGreenActive] = useState(false);

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onSignalClick = color => {

        setIsRedActive(false);
        setIsYellowActive(false);
        setIsGreenActive(false);

        switch (color) {
            case RED:
                setIsRedActive(!isRedActive);
                break;
            case YELLOW:
                setIsYellowActive(!isYellowActive);
                break;
            case GREEN:
                setIsGreenActive(!isGreenActive);
                break;
        }
    }


    return (
        <Holder className={style.teacher} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={`${style.col} ${style.lightWrapper}`}>
                <div className={style.backRod}></div>
                <div className={style.signalWrapper}>
                    <Signal color={RED} isActive={isRedActive} onSignalClick={onSignalClick}></Signal>
                    <Signal color={YELLOW} isActive={isYellowActive} onSignalClick={onSignalClick}></Signal>
                    <Signal color={GREEN} isActive={isGreenActive} onSignalClick={onSignalClick}></Signal>
                </div>
            </div>
            <div className={`${style.col}  ${style.labelWrapper}`}>
                <div className={style.labelContainer}>
                    <div className={isRedActive && style.redActive}>{i18n.t('teacher.notavailable')}</div>
                    <div className={isYellowActive && style.yellowActive}>{i18n.t('teacher.ifveryurgent')}</div>
                    <div className={isGreenActive && style.greenActive}>{i18n.t('teacher.available')}</div>
                </div>
            </div>
        </Holder>
    );
};

export default Teacher;