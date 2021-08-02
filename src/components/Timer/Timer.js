
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../elements/Button/Button';
import Holder from '../../elements/Holder/Holder';
import RadioButton from '../../elements/RadioButton/RadioButton';
import CountDownTimer from '../CountDownTimer/CountDownTimer';
import StandardTimer from '../StandardTimer/StandardTimer';
import TitleInput from '../../elements/TitleInput/TitleInput';

import style from './Timer.module.scss';
import ToggleButton from '../../elements/ToggleButton/ToggleButton';


const Timer = ({ count = 1, onCompClick, onCompClose }) => {

    const { t, i18n } = useTranslation();
    const [intervalStarted, setIntervalStarted] = useState(false);
    const [resetFlag, setResetFlag] = useState(false);
    const [pauseFlag, setPauseFlag] = useState(false);
    const [selectedTimer, setSelectedTimer] = useState(false);
    const standardRef = useRef();
    const countDownRef = useRef();

    // useEffect(() => {
    //     if (!intervalStarted && !resetFlag) {
    //         standardRef.current.state.currentTime = 0;
    //         countDownRef.current.state.currentTime = countDownRef.current.state.startSec;
    //         countDownRef.current.state.editMode = true;
    //     }
    // }, [intervalStarted, resetFlag]);

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onStartClick = () => {
        setIntervalStarted(true);
        setResetFlag(true);
    }

    const onPauseClick = () => {
        setIntervalStarted(false);
        setPauseFlag(true);
    }

    const onResumeClick = () => {
        setIntervalStarted(true);
        setPauseFlag(false);
    }

    const onResetClick = () => {
        setIntervalStarted(false);
        setResetFlag(false);
        setPauseFlag(false);
        if(standardRef && standardRef.current) standardRef.current.state.currentTime = 0;
        if(countDownRef && countDownRef.current) countDownRef.current.state.currentTime = countDownRef.current.state.startSec;
    }

    const onRadioChange = flag => {
        setSelectedTimer(flag);
    }

    return (
        <Holder help={ t('tooltip.timer') } className={`${style.timer}`} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={style.titleRow}>
                <TitleInput defaultVal={`Timer ${count}`}/>
            </div>
            <div className={style.labelRow}>
                <label className={!selectedTimer ? style.active : ''}>{t('timer.standardtimer')}</label>
                <ToggleButton disabled={intervalStarted} onChange={onRadioChange} />
                <label className={selectedTimer ? style.active : ''}>{t('timer.countdowntimer')}</label>
            </div>
            <div className={style.row}>
                {selectedTimer ?
                    <CountDownTimer ref={countDownRef} editMode={true} intervalStarted={intervalStarted} ></CountDownTimer>
                    :
                    <StandardTimer ref={standardRef} intervalStarted={intervalStarted}></StandardTimer>
                }
            </div>
            <div className={style.controlPanel}>
                {intervalStarted || resetFlag ? (<>
                    {pauseFlag ? (<Button primary label="Resume" onClick={onResumeClick}></Button>) :
                        (<Button primary label="Pause" onClick={onPauseClick}></Button>)}
                    <Button primary label={t('timer.reset')} onClick={onResetClick}></Button>
                </>) :
                    (<Button primary label={t('timer.start')} onClick={onStartClick}></Button>)}
            </div>
        </Holder >
    );
};

export default Timer;