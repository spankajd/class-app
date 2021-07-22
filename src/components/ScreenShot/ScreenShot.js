
import React, {useRef} from 'react';
import Button from '../../elements/Button/Button';
import { useReactToPrint } from 'react-to-print';

import style from './ScreenShot.module.scss';

import { IconGroupBuilder, Close } from '../../elements/Icon/Icon';

const ScreenShot = ({ imgPath = '', onClose }) => {

    const componentRef = useRef();

    const onShareClick = () => {
        console.log('onShareClick >>>>>>');
        alert('Shared...');
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
        content: () => componentRef.current,
    })

    return (
        <div className={style.screenShot}>
        
            <img className={style.image} src={imgPath} alt='screenshot' ref={componentRef}/>

            <div className={`${style.controlPanel} `}>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onShareClick}>
                        <span className={style.menuItemContent}>
                            <IconGroupBuilder className={style.icon}></IconGroupBuilder>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onSaveClick}>
                        <span className={style.menuItemContent}>
                            <IconGroupBuilder className={style.icon}></IconGroupBuilder>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
                    <button type="button" className={style.menuItem} onClick={onPrintClick}>
                        <span className={style.menuItemContent}>
                            <IconGroupBuilder className={style.icon}></IconGroupBuilder>
                        </span>
                    </button>
                </div>

                <div className={style.menuItemWrapper}>
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