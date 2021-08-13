
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Holder from '../../elements/Holder/Holder';
import Webcam from "react-webcam";

import style from './WebCam.module.scss';
import Button from '../../elements/Button/Button';
import { WebCamIcon, CursorIcon, ScreenShotIcon } from '../../elements/Icon/Icon';



const WebCam = ({ onCompClick, onCompClose }) => {

    const { t, i18n } = useTranslation();

    const [imageData, setImageData] = useState(null);
    const [startWebCam, setStartWebCam] = useState(false);
    const [cursorMode, setCursorMode] = useState(false);
    const webcamRef = useRef(null);
    const cursorRef = useRef(null);
    const stageRef = useRef(null);
    
    useEffect(() => {
        if(stageRef.current && cursorRef.current) {
            stageRef.current.addEventListener('mousemove',onMouseMove);
            stageRef.current.addEventListener('touchmove',onMouseMove);
            stageRef.current.addEventListener('touchstart',onMouseMove);
        }
        return () => {
            stageRef.current && stageRef.current.removeEventListener('mousemove',onMouseMove)
            stageRef.current && stageRef.current.removeEventListener('touchmove',onMouseMove);
            stageRef.current && stageRef.current.removeEventListener('touchstart',onMouseMove);
        };
    }, [cursorMode])

    const onMouseMove = e => {
        if(e.type == 'touchmove' || e.type == 'touchstart') {
            e.pageX = e.touches[0].pageX;
            e.pageY = e.touches[0].pageY;
        }
        const {left, top} = stageRef.current.getBoundingClientRect();
        cursorRef.current.style.left = `${e.pageX - left}px`;
        cursorRef.current.style.top = `${e.pageY - top}px`;
    }


    const onCloseClick = e => {
        onCompClose(e);
    }

    const onStartWebcam = () => {
        setImageData(null);
        setStartWebCam(true);
    }

    const onStopWebcam = () => {
        setStartWebCam(false);
    }

    const onCapture = () => {
        if(!imageData) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImageData(imageSrc);
        } else {
            setImageData(null);
        }
    };

    const onClear = () => {
        setImageData(null);
    };

    const onCursorClick = () => {
        setCursorMode(!cursorMode);
    }


    return (
        <Holder help={ t('tooltip.webcam') } resizeDirect={'rtl'} className={`${style.webcam} ${startWebCam ? style.webCamOn : ''}`} onCompClick={onCompClick} onClose={onCloseClick} >


            <div className={style.controlPanel}>
                <div onClick={onStartWebcam}>
                    <WebCamIcon className={`${style.icon} ${style.webCamIcon} ${(startWebCam && !imageData) ? style.active : ''}`} />
                </div>
                <div onClick={onCursorClick} className={!startWebCam ? style.disable : ''}>
                    <CursorIcon className={`${style.icon} ${style.cursorIcon} ${cursorMode ? style.active : ''}`} />
                </div>
                <div onClick={onCapture} className={!startWebCam ? style.disable : ''}>
                    <ScreenShotIcon className={`${style.icon} ${style.screenShotIcon} ${imageData ? style.active : ''}`} />
                </div>
            </div>

            {startWebCam && (<div className={`${style.screen} ${cursorMode ? style.cursorModeOn : ''}`} ref={stageRef} >

                {imageData ? (<img src={imageData}></img>) : (<Webcam
                    audio={false}
                    height={'100%'}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={'100%'}
                    mirrored = {false}
                />)}
                {cursorMode && <div className={style.cursor} ref={cursorRef}>
                    <CursorIcon />
                </div>
                }

            </div>)}


        </Holder>
    );
};

export default WebCam;