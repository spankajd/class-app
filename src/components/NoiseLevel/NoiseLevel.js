
import React, { useState } from 'react';

import Holder from '../../elements/Holder/Holder';
import Signal from '../../elements/Signal/Signal';

import style from './NoiseLevel.module.scss';
import Button from '../../elements/Button/Button';


/**
 * Primary UI component for user interaction
 */
const NoiseLevel = ({ onCompClick, onCompClose }) => {

    const onCloseClick = e => {
        onCompClose(e);
    }

    var options = {
        strokeWidth: 2
    };

    // For demo purposes so the container has some dimensions.
    // Otherwise progress bar won't be shown
    var containerStyle = {
        width: '200px',
        height: '200px'
    };

    return (
        <Holder className={style.noiseLevel} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={`${style.row} ${style.progressWrapper}`}>
                <div className={style.progressBar}>
                </div>
                <label className={style.counterWrapper}>
                    <input type="text" />
                    <span>Counter</span>
                </label>
            </div>
            <div className={`${style.row} ${style.inputPanel}`}>
                <div className={style.row}>
                    <span className={style.col}>Maximum Noise</span>
                    <input className={style.col} type="text" />
                </div>
                <div className={style.row}>
                    <div className={style.col}>The maximum number of times the noise level can be exceded</div>
                    <input className={style.col} type="text" />
                </div>
            </div>
            <div className={style.row}>
                <div className={style.col}> Sensitivity</div>
                <div className={`${style.col} ${style.sensitivityWrapper}` }>
                    <label>
                        <input type="radio" name="sensitivity" />
                        <span>Low</span>
                    </label>
                    <label>
                        <input type="radio" name="sensitivity" />
                        <span>Medium</span>
                    </label>
                    <label>
                        <input type="radio" name="sensitivity" />
                        <span>High</span>
                    </label>
                </div>
            </div>
            <div className={`${style.row} ${style.bottomPanel}`}>
                <Button label="Restart"></Button>
            </div>

        </Holder>
    );
};

export default NoiseLevel;