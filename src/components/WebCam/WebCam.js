
import React, { useState, useRef } from 'react';

import Holder from '../../elements/Holder/Holder';
import Webcam from "react-webcam";

import style from './WebCam.module.scss';
import Button from '../../elements/Button/Button';



const WebCam = ({ onCompClick, onCompClose }) => {

    const [imageData, setImageData] = useState(null);
    const [startWebCam, setStartWebCam] = useState(false);
    const webcamRef = useRef(null);


    const onCloseClick = e => {
        onCompClose(e);
    }

    const onStartWebcam = () => {
        setStartWebCam(true);
    }

    const onStopWebcam = () => {
        setStartWebCam(false);
    }

    const onCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageData(imageSrc);
    };

    const onClear = () => {
        setImageData(null);
    };


    return (
        <Holder className={style.webcam} onCompClick={onCompClick} onClose={onCloseClick}>
            {startWebCam && (<div className={style.screen}>

                {imageData ? (<img src={imageData}></img>) : (<Webcam
                    audio={false}
                    height={'100%'}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={'100%'}
                />)}
            </div>)}

            <div className={style.controlPanel}>
                {!startWebCam && (<Button label="Start the webcam" onClick={onStartWebcam}></Button>)}
                {startWebCam && (
                    <>
                        {imageData ? (<Button label="Clear screenshot" onClick={onClear}></Button>) : (<Button label="Take screenshot" onClick={onCapture}></Button>)}
                        <Button label="Stop the webcam" onClick={onStopWebcam}></Button>
                    </>)}
            </div>


        </Holder>
    );
};

export default WebCam;