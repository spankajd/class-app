
import React, { useState } from 'react';
import Button from '../../elements/Button/Button';
import Holder from '../../elements/Holder/Holder';
import CountDownTimer from '../CountDownTimer/CountDownTimer';
import StandardTimer from '../StandardTimer/StandardTimer';

import style from './Timer.module.scss';


const Timer = ({ onCompClick, onCompClose }) => {

    const [intervalStarted, setIntervalStarted] = useState(false);
    const [resetFlag, setResetFlag] = useState(false);
    const [selectedTimer, setSelectedTimer] = useState('');

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onStartClick = () => {
        setIntervalStarted(true);
        setResetFlag(true);
    }

    const onStopClick = () => {
        setIntervalStarted(false);
    }

    const onResetClick = () => {
        setIntervalStarted(false);
        setResetFlag(false);
    }

    const onRadioChange = (e) => {
        setSelectedTimer(e.target.value);
    }

    return (
        <Holder className={`${style.timer}`} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={style.row}>
                <label className={style.label} for="standard">Standard timer</label>
                <div className={style.radioWrapper}>
                    <input type="radio" name="timer" id="standard" value="standard" className={style.radio} onChange={onRadioChange} disabled={intervalStarted}></input>
                    <span className={style.checkmark}></span>
                </div>
                {/* <StandardTimer ref={standardTimer} ></StandardTimer> */}
                <StandardTimer intervalStarted={intervalStarted && selectedTimer==='standard'}></StandardTimer>
            </div>
            <div className={style.row}>
                <label className={style.label} for="countdown">Countdown timer</label>
                <div className={style.radioWrapper}>
                    <input type="radio" name="timer" id="countdown" value="countdown" className={style.radio} onChange={onRadioChange} disabled={intervalStarted}></input>
                    <span className={style.checkmark}></span>
                </div>
                {/* <CountDownTimer ref={countDownTimer} ></CountDownTimer> */}
                <CountDownTimer intervalStarted={intervalStarted && selectedTimer==='countdown'} ></CountDownTimer>
            </div>
            <div className={style.controlPanel}>
                {intervalStarted || resetFlag ? (<>
                    <Button label="Stop" onClick={onStopClick}></Button>
                    <Button label="Reset" onClick={onResetClick}></Button>
                </>) :
                    (<Button label="Start" onClick={onStartClick}></Button>)}
            </div>
        </Holder >
    );
};

export default Timer;