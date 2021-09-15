
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Holder from '../../elements/Holder/Holder';
import Webcam from "react-webcam";

import style from './WebCam.module.scss';
import Button from '../../elements/Button/Button';
import { WebCamIcon, CursorIcon, CameraSwitch, ScreenShotIcon } from '../../elements/Icon/Icon';


let isMainCamera = true;
const WebCam = ({ onCompClick, onCompClose }) => {

    const { t, i18n } = useTranslation();
    const mainCamera = {
        facingMode: "user"
    }

    const selfie = {
        facingMode: { exact: "environment" }
    }

    const [imageData, setImageData] = useState(null);
    const [startWebCam, setStartWebCam] = useState(false);
    const [cursorMode, setCursorMode] = useState(false);
    const [videoConstraints, setVideoConstraints] = useState(mainCamera);


    const webcamRef = useRef(null);
    const cursorRef = useRef(null);
    const stageRef = useRef(null);

    useEffect(() => {
        if (stageRef.current && cursorRef.current) {
            stageRef.current.addEventListener('mousemove', onMouseMove);
            stageRef.current.addEventListener('touchmove', onMouseMove);
            stageRef.current.addEventListener('touchstart', onMouseMove);
        }
        return () => {
            stageRef.current && stageRef.current.removeEventListener('mousemove', onMouseMove)
            stageRef.current && stageRef.current.removeEventListener('touchmove', onMouseMove);
            stageRef.current && stageRef.current.removeEventListener('touchstart', onMouseMove);
        };
    }, [cursorMode])

    const onMouseMove = e => {
        let pageX = e.pageX;
        let pageY = e.pageY;
        if (e.type == 'touchmove' || e.type == 'touchstart') {
            pageX = e.touches[0].pageX;
            pageY = e.touches[0].pageY;
        }
        const { left, top } = stageRef.current.getBoundingClientRect();
        cursorRef.current.style.left = `${pageX - left}px`;
        cursorRef.current.style.top = `${pageY - top}px`;
    }


    const onCloseClick = e => {
        onCompClose(e);
    }

    const onStartWebcam = () => {
        setImageData(null);
        setCursorMode(false);
        setStartWebCam(true);
    }

    const onStopWebcam = () => {
        setStartWebCam(false);
    }

    const onCapture = () => {
        if (!imageData) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImageData(imageSrc);
            setCursorMode(true);
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

    const onCameraSwitchClick = () => {
        isMainCamera = !isMainCamera;
        if (isMainCamera) {
            setVideoConstraints(mainCamera);
        } else {
            setVideoConstraints(selfie);
        }
    }


    return (
        <Holder maintainAspectRatio={startWebCam} aspectWithRespectTo={stageRef} resizable={startWebCam} help={t('tooltip.webcam')} resizeDirect={'rtl'} className={`${style.webcam} ${startWebCam ? style.webCamOn : ''}`} onCompClick={onCompClick} onClose={onCloseClick} >


            <div className={style.controlPanel}>
                <div onClick={onStartWebcam}>
                    <WebCamIcon className={`${style.icon} ${style.webCamIcon} ${(startWebCam && !imageData) ? style.active : ''}`} />
                </div>
                <div onClick={onCursorClick} className={`${style.cursorIconButton} ${!startWebCam || !imageData ? style.disable : ''}`}>
                    <CursorIcon className={`${style.icon} ${style.cursorIcon} ${cursorMode ? style.active : ''}`} />
                </div>
                <div onClick={onCameraSwitchClick} className={`${style.cameraSwitchButton} ${!startWebCam || imageData ? style.disable : ''}`}>
                    <CameraSwitch className={`${style.icon} ${style.cameraSwitch} ${cursorMode ? style.active : ''}`} />
                </div>
                <div onClick={onCapture} className={!startWebCam ? style.disable : ''}>
                    <ScreenShotIcon className={`${style.icon} ${style.screenShotIcon} ${imageData ? style.active : ''}`} />
                </div>
            </div>

            {startWebCam && (<div className={`${style.screen} ${cursorMode ? style.cursorModeOn : ''}`} ref={stageRef} >

                {imageData ? (<img src={imageData}></img>) : (<Webcam
                    videoConstraints={videoConstraints}
                    audio={false}
                    height={'100%'}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={'100%'}
                    mirrored={false}
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