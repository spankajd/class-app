import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Holder from '../../elements/Holder/Holder';
import Signal from '../../elements/Signal/Signal';

import Button from '../../elements/Button/Button';
import RadioButton from '../../elements/RadioButton/RadioButton';

import { validateNumnerInput } from '../../helper';

import style from './NoiseLevel.module.scss';

let audioContext, analyser, microphone, javascriptNode, streamObj;
let volume = 0;
let lastClip = 0;
let clipLevel = 0.98;
let clipLag = 750;
const averaging = 0.95;
let clipping = false;
var MAX = 100;
var sensitivity = 1.5;

var checkAudioStatus = false;

// REFERENCES
// https://makitweb.com/pitch-volume-detection-in-speech-recognition-javascript/
// https://makitweb.com/pitch-volume-detection-in-speech-recognition-javascript/


const NoiseLevel = ({ onCompClick, onCompClose }) => {

    const { t, i18n } = useTranslation();
    const [maxNoise, setMaxNoise] = useState(75);
    const [currentNoise, setCurrentNoise] = useState(0);
    const [noiseLimit, setNoiseLimit] = useState(4);
    const [noiseCounter, setNoiseCounter] = useState(0);
    const [startMic, setStartMic] = useState(false);
    // const [sensitivity, setSensitivity] = useState(1.5);

    useEffect(() => {
        // maxLevel = maxNoise;

        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        return () => {
            stoppingMic();
        }
    }, []);

    useEffect(() => {
        if (startMic && navigator.getUserMedia) {
            navigator.getUserMedia({
                audio: true
            },
                function (stream) {
                    streamObj = stream;
                    audioContext = new AudioContext();
                    analyser = audioContext.createAnalyser();
                    microphone = audioContext.createMediaStreamSource(stream);
                    javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
                    checkAudioStatus = true;

                    analyser.smoothingTimeConstant = 0.8;
                    analyser.fftSize = 1024;

                    microphone.connect(analyser);
                    analyser.connect(javascriptNode);
                    javascriptNode.connect(audioContext.destination);

                    javascriptNode.onaudioprocess = onStreaming;

                    javascriptNode.onended = function () {
                        stoppingMic();
                    }
                },
                function (err) {
                    console.log("The following error occured: " + err.name)
                });
        } else if (startMic) {
            alert("getUserMedia not supported");
        } else {
            stoppingMic();
        }


    }, [startMic]);

    useEffect(() => {
        if (currentNoise > maxNoise) {
            setNoiseCounter(noiseCounter + 1);
        }
    }, [currentNoise]);

    const stoppingMic = () => {

        setCurrentNoise(0);
        setNoiseCounter(0);
        microphone && microphone.disconnect();
        analyser && analyser.disconnect();
        if (javascriptNode) {
            javascriptNode.disconnect();
            javascriptNode.onaudioprocess = null;
        }
        try {
            if(checkAudioStatus && audioContext) {
                checkAudioStatus = false;
                audioContext.close();
            }
        } catch(e)  {
            console.log(e);
        }
        streamObj && streamObj.getTracks().forEach(function (track) {
            if (track.readyState == 'live' && track.kind === 'audio') {
                track.stop();
            }
        });
    }

    const onStreaming = (event) => {
        // var array = new Uint8Array(analyser.frequencyBinCount);
        // analyser.getByteFrequencyData(array);
        // var values = 0;

        // var length = array.length;
        // for (var i = 0; i < length; i++) {
        //     values += (array[i]);
        // }

        // var average = values / length;

        // //          console.log(Math.round(average - 40));

        // // canvasContext.clearRect(0, 0, 150, 300);
        // // canvasContext.fillStyle = '#BadA55';
        // // canvasContext.fillRect(0, 300 - average, 150, 300);
        // // canvasContext.fillStyle = '#262626';
        // // canvasContext.font = "48px impact";
        // // canvasContext.fillText(Math.round(average - 40), -2, 300);
        // console.log('output >>>> ' , Math.round(average - 40) , average);

        var buf = event.inputBuffer.getChannelData(0);
        var bufLength = buf.length;
        var sum = 0;
        var x;

        // Do a root-mean-square on the samples: sum up the squares...
        for (var i = 0; i < bufLength; i++) {
            x = buf[i];
            if (Math.abs(x) >= clipLevel) {
                clipping = true;
                lastClip = window.performance.now();
            }
            sum += x * x;
        }

        // ... then take the square root of the sum.
        var rms = Math.sqrt(sum / bufLength);

        // Now smooth this out with the averaging factor applied
        // to the previous sample - take the max here because we
        // want "fast attack, slow release."
        volume = Math.max(rms, volume * averaging);
        let newNoise = Math.min(volume * sensitivity * MAX, 100);
        // console.log('sensitivity ' , sensitivity);
        setCurrentNoise(newNoise);

    } // end fn stream

    const onCloseClick = e => {
        setStartMic(false);
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

    const onMaxNoiseUpdate = e => {
        const val = validateNumnerInput(e.target.value);
        if (val != null) {
            const curVal = val === '' ? val : Math.min(val, 100);
            setMaxNoise(curVal);
            setNoiseCounter(0);
        }
    }

    const onNoiseLimitUpdate = e => {
        const val = validateNumnerInput(e.target.value);
        if (val != null) {
            const curVal = val === '' ? val : Math.min(val, 100);
            setNoiseLimit(curVal);
            setNoiseCounter(0);
        }
    }

    const onStartClick = () => {
        setStartMic(!startMic);
    }

    const onRadioChange = id => {
        setNoiseCounter(0);
        switch (id) {
            case "low": sensitivity = 1;
                break;
            case "medium": sensitivity = 1.5;
                break;
            case "high": sensitivity = 2;
                break;
        }
    }

    return (
        <Holder help={t('tooltip.noiselevel')} className={style.noiseLevel} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={`${style.col} ${style.leftPanel}`}>
                <div className={`${style.row} ${style.inputRow}`}>
                    <span className={style.label}>{t('noiselevel.maximumnoise')}</span>
                    <input className={style.input} type="text" onChange={onMaxNoiseUpdate} value={maxNoise} disabled={startMic} />
                </div>
                <div className={`${style.row} ${style.inputRow}`}>
                    <div className={style.label}>{t('noiselevel.noiselimit')}</div>
                    <input className={style.input} type="text" onChange={onNoiseLimitUpdate} value={noiseLimit} disabled={startMic} />
                </div>
                <div className={`${style.col} ${style.sensitivityWrapper}`}>
                    <div className={style.label}>{t('noiselevel.sensitivity')}</div>
                    <div className={`${style.row} ${style.optionWrapper}`}>
                        <label>
                            <RadioButton name="sensitivity" id="low" value="low" onChange={onRadioChange} disabled={startMic}></RadioButton>
                            <span className={style.label}>{t('noiselevel.low')}</span>
                        </label>
                        <label>
                            <RadioButton name="sensitivity" id="medium" value="medium" onChange={onRadioChange} disabled={startMic}></RadioButton>
                            <span className={style.label}>{t('noiselevel.medium')}</span>
                        </label>
                        <label>
                            <RadioButton name="sensitivity" id="high" value="high" onChange={onRadioChange} disabled={startMic}></RadioButton>
                            <span className={style.label}>{t('noiselevel.high')}</span>
                        </label>
                    </div>
                </div>
                <div className={`${style.row} ${style.warningInputWrapper}`}>
                    <textarea disabled={startMic} className={`${style.input} ${style.textarea}`} type="text" placeholder={'The noise level is being exceeded'} />
                </div>
                <div className={`${style.row} ${style.bottomPanel}`}>
                    <Button primary label={startMic ? t('noiselevel.stop') : t('noiselevel.start')} onClick={onStartClick}></Button>
                </div>
            </div>
            <div className={`${style.col} ${style.progressWrapper}`}>
                <div className={style.progressBar}>
                    <div className={`${style.bar} ${style.secondaryBar}`} style={{ height: `${maxNoise}%` }}></div>
                    <div className={`${style.bar} ${style.primaryBar}`} style={{ height: `${currentNoise}%` }}></div>
                    <div className={`${style.indicator}`}>{currentNoise.toFixed()}</div>
                </div>
                <label className={style.counterWrapper}>
                    <input className={style.input} type="text" readyonly value={noiseCounter} disabled={true} />
                    <span className={style.label}>{t('noiselevel.counter')}</span>
                </label>
            </div>
        </Holder>
    );
};

export default NoiseLevel;