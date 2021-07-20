
import React, { useState, useEffect } from 'react';

import Holder from '../../elements/Holder/Holder';
import Signal from '../../elements/Signal/Signal';

import Button from '../../elements/Button/Button';
import RadioButton from '../../elements/RadioButton/RadioButton';

import style from './NoiseLevel.module.scss';

let audioContext, analyser, microphone, javascriptNode;


const NoiseLevel = ({ onCompClick, onCompClose }) => {

    const [maxNoise, setMaxNoise] = useState(75);
    const [noiseLimit, setNoiseLimit] = useState(4);
    const [noiseCounter, setNoiseCounter] = useState(0);

    // useEffect(() => {
    //     navigator.getUserMedia = navigator.getUserMedia ||
    //         navigator.webkitGetUserMedia ||
    //         navigator.mozGetUserMedia;
    //     if (navigator.getUserMedia) {
    //         navigator.getUserMedia({
    //             audio: true
    //         },
    //             function (stream) {
    //                 audioContext = new AudioContext();
    //                 analyser = audioContext.createAnalyser();
    //                 microphone = audioContext.createMediaStreamSource(stream);
    //                 javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
    //                 let volume = 0; 
    //                 let lastClip = 0;
    //                 let clipLevel = 0.98;
    //                 let clipLag = 750;
    //                 const averaging = 0.95;
    //                 let clipping = false;
    //                 var MAX = 100;

    //                 analyser.smoothingTimeConstant = 0.8;
    //                 analyser.fftSize = 1024;

    //                 microphone.connect(analyser);
    //                 analyser.connect(javascriptNode);
    //                 javascriptNode.connect(audioContext.destination);

    //                 javascriptNode.onaudioprocess = function (event) {
    //                     // var array = new Uint8Array(analyser.frequencyBinCount);
    //                     // analyser.getByteFrequencyData(array);
    //                     // var values = 0;

    //                     // var length = array.length;
    //                     // for (var i = 0; i < length; i++) {
    //                     //     values += (array[i]);
    //                     // }

    //                     // var average = values / length;

    //                     // //          console.log(Math.round(average - 40));

    //                     // // canvasContext.clearRect(0, 0, 150, 300);
    //                     // // canvasContext.fillStyle = '#BadA55';
    //                     // // canvasContext.fillRect(0, 300 - average, 150, 300);
    //                     // // canvasContext.fillStyle = '#262626';
    //                     // // canvasContext.font = "48px impact";
    //                     // // canvasContext.fillText(Math.round(average - 40), -2, 300);
    //                     // console.log('output >>>> ' , Math.round(average - 40) , average);

    //                     var buf = event.inputBuffer.getChannelData(0);
    //                     var bufLength = buf.length;
    //                     var sum = 0;
    //                     var x;

    //                     // Do a root-mean-square on the samples: sum up the squares...
    //                     for (var i = 0; i < bufLength; i++) {
    //                         x = buf[i];
    //                         if (Math.abs(x) >= clipLevel) {
    //                             clipping = true;
    //                             lastClip = window.performance.now();
    //                         }
    //                         sum += x * x;
    //                     }

    //                     // ... then take the square root of the sum.
    //                     var rms = Math.sqrt(sum / bufLength);

    //                     // Now smooth this out with the averaging factor applied
    //                     // to the previous sample - take the max here because we
    //                     // want "fast attack, slow release."
    //                     volume = Math.max(rms, volume * averaging);
    //                     console.log( '>>> ' , volume*1.4*MAX);

    //                 } // end fn stream

    //                 javascriptNode.onended = function() {
    //                     // javascriptNode.disconnect(scriptNode);
    //                     // scriptNode.disconnect(audioCtx.destination);
    //                   }
    //             },
    //             function (err) {
    //                 console.log("The following error occured: " + err.name)
    //             });
    //     } else {
    //         console.log("getUserMedia not supported");
    //     }

    //     return () => {
    //         microphone.disconnect();
    //         analyser.disconnect();
    //         javascriptNode.disconnect();
    //         javascriptNode.onaudioprocess = null;
    //         audioContext.close();
    //     }
    // }, [])

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

    const onMaxNoiseUpdate = e => {
        const val = e.target.value;
        let curVal = val ? Math.min(Math.max(val, 1), 100) : '';
        setMaxNoise(curVal);
    }

    const onNoiseLimitUpdate = e => {
        const val = e.target.value;
        let curVal = val ? Math.min(Math.max(val, 1), 100) : '';
        setNoiseLimit(curVal);
    }

    const onRadioChange = id => {

    }

    return (
        <Holder className={style.noiseLevel} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={`${style.col} ${style.leftPanel}`}>
                <div className={style.row}>
                    <span className={style.label}>Maximum Noise</span>
                    <input className={style.input} type="text" onChange={onMaxNoiseUpdate} value={maxNoise}/>
                </div>
                <div className={style.row}>
                    <div className={style.label}>Noise limit</div>
                    <input className={style.input} type="text" onChange={onNoiseLimitUpdate} value={noiseLimit}/>
                </div>
                <div className={`${style.col} ${style.sensitivityWrapper}`}>
                    <div className={style.label}> Sensitivity</div>
                    <div className={`${style.row} ${style.optionWrapper}`}>
                        <label>
                            <RadioButton name="sensitivity" id="low" value="low" onChange={onRadioChange}></RadioButton>
                            <span className={style.label}>Low</span>
                        </label>
                        <label>
                            <RadioButton name="sensitivity" id="medium" value="medium" onChange={onRadioChange}></RadioButton>
                            <span className={style.label}>Medium</span>
                        </label>
                        <label>
                            <RadioButton name="sensitivity" id="high" value="high" onChange={onRadioChange}></RadioButton>
                            <span className={style.label}>High</span>
                        </label>
                    </div>
                </div>
                <div className={`${style.row} ${style.warningInputWrapper}`}>
                    <input className={style.input} type="text" />
                </div>
                <div className={`${style.row} ${style.bottomPanel}`}>
                    <Button primary label="Start"></Button>
                </div>
            </div>
            <div className={`${style.col} ${style.progressWrapper}`}>
                <div className={style.progressBar}>
                    <div className={`${style.bar} ${style.secondaryBar}`} style={{height:`${maxNoise}%`}}></div>
                    <div className={`${style.bar} ${style.primaryBar}`}></div>
                </div>
                <label className={style.counterWrapper}>
                    <input type="text" readyonly value={noiseCounter} />
                    <span className={style.label}>Counter</span>
                </label>
            </div>
        </Holder>
    );
};

export default NoiseLevel;