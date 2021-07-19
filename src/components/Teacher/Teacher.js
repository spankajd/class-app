
import React, { useState } from 'react';

import Holder from '../../elements/Holder/Holder';
import Signal from '../../elements/Signal/Signal';

import style from './Teacher.module.scss';

/**
 * Primary UI component for user interaction
 */
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
            case 'red':
                setIsRedActive(!isRedActive);
                break;
            case 'yellow':
                setIsYellowActive(!isYellowActive);
                break;
            case 'green':
                setIsGreenActive(!isGreenActive);
                break;
        }
    }


    return (
        <Holder className={style.teacher} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={`${style.col} ${style.lightWrapper}`}>
                <div className={style.backRod}></div>
                <div className={style.signalWrapper}>
                    <Signal color="red" isActive={isRedActive} onSignalClick={onSignalClick}></Signal>
                    <Signal color="yellow" isActive={isYellowActive} onSignalClick={onSignalClick}></Signal>
                    <Signal color="green" isActive={isGreenActive} onSignalClick={onSignalClick}></Signal>
                </div>
            </div>
            <div className={`${style.col}  ${style.labelWrapper}`}>
                <div className={style.labelContainer}>
                    <div className={isRedActive && style.redActive}>Not available</div>
                    <div className={isYellowActive && style.yellowActive}>If very urgent</div>
                    <div className={isGreenActive && style.greenActive}>Available</div>
                </div>
            </div>
        </Holder>
    );
};

export default Teacher;