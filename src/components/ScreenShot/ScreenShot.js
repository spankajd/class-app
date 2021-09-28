
import React, {useRef} from 'react';
import Button from '../../elements/Button/Button';
import { useReactToPrint } from 'react-to-print';

import style from './ScreenShot.module.scss';

import { SaveIcon, PrintIcon, ShareIcon, Close } from '../../elements/Icon/Icon';

const ScreenShot = ({ imgPath = '', onClose }) => {

    const componentRef = useRef();

    const onShareClick = () => {
        console.log('onShareClick >>>>>>');
        window.location.href = "mailto:"
    }
    const onSaveClick = () => {
        const screenCaptureSource = imgPath;
        const downloadLink = document.createElement('a');
        const fileName = 'screenshot.png';

        downloadLink.href = screenCaptureSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    const onPrintClick = useReactToPrint({
        bodyClass: "printable",
        content: () => componentRef.current,
        pageStyle: `img { width: 100%; } @media print{@page {size: landscape}}`
    })

    return (
        <div className={style.screenShot}>
        
            <img className={style.image} src={imgPath} alt='screenshot' ref={componentRef}/>

            <div className={`${style.controlPanel} `}>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onShareClick}>
                        <span className={style.menuItemContent}>
                            <ShareIcon className={style.icon}></ShareIcon>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onSaveClick}>
                        <span className={style.menuItemContent}>
                            <SaveIcon className={style.icon}></SaveIcon>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onPrintClick}>
                        <span className={style.menuItemContent}>
                            <PrintIcon className={style.icon}></PrintIcon>
                        </span>
                    </button>
                </div>

                <div className={`${style.menuItemWrapper} ${style.bottomClose}`}>
                    <button type="button" className={`${style.menuItem} ${style.closeMenuItem}`} onClick={onClose}>
                        <span className={style.menuItemContent}>
                            <Close className={style.icon}></Close>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScreenShot;