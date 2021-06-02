
import React from 'react';
import Button from '../../elements/Button/Button';

import style from './ScreenShot.module.scss';


const ScreenShot = ({ imgPath = '', onClose }) => {

    const onShareClick = () => {
        console.log('onShareClick >>>>>>' );
        alert('Shared...');
    }
    const onSaveClick = () => {
        console.log('onSaveClick >>>>>>' );
        const screenCaptureSource = imgPath;
        const downloadLink = document.createElement('a');
        const fileName = 'screenshot.png';

        downloadLink.href = screenCaptureSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }
    const onPrintClick = () => {
        console.log('onPrintClick >>>>>>' );
        alert('Printing...');
    }
    
    return (
        <div className={style.screenShot}>
            <Button className={style.closeButton} label="X" onClick={onClose}></Button>
            <div>
                <img className={style.image} src={imgPath} alt='screenshot' />
            </div>
            <div className={style.controlPanel}>
                <Button primary label="Share" onClick={onShareClick}></Button>
                <Button primary label="Save" onClick={onSaveClick}></Button>
                <Button primary label="Print" onClick={onPrintClick}></Button>
            </div>
        </div>
    );
};

export default ScreenShot;