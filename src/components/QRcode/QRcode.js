import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import QRCode from 'qrcode.react';

import Holder from '../../elements/Holder/Holder';

import style from './QRcode.module.scss';
import Button from '../../elements/Button/Button';
import TitleInput from '../../elements/TitleInput/TitleInput';


const QRcode = ({ onCompClick, onCompClose, count }) => {
    const { t, i18n } = useTranslation();
    const placeHolder = ""; // "https://www.klett-sprachen.de/";
    const [inputVal, setInputVal] = useState("");
    const [qrInput, setQrInput] = useState(placeHolder);
    const componentRef = useRef();
    const [title, setTitle] = useState(`Title ${count}`);

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onInputChange = e => {
        const val = e.target.value;
        setInputVal(val);
        setQrInput(val ? val : placeHolder);
    }

    const print = useReactToPrint({
        content: () => componentRef.current,
    })

    const onTitleInputChange = val => {
        setTitle(val);
    }

    return (
        <Holder className={style.qrcode} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={style.title}><TitleInput onChange={onTitleInputChange} defaultVal={title} /></div>
            <div className={style.subtitle}>{t('qrcode.instruction')}</div>
            <input className={style.input} type="text" placeholder={placeHolder} value={inputVal} onChange={onInputChange}></input>
            { qrInput && (<>
            <div className={style.qrContainer} >
                <QRCode value={qrInput} renderAs="svg"></QRCode>
            </div>
            <Button primary label={t("whoisnext.print")} onClick={print} />
            </>)}

            <div className={style.printWrapper}>
                <div className={style.printPage} ref={componentRef}>
                    <div style={{border:'1px solid', padding: '30px', margin: '30px', display:'inline-block'}}>
                        {/* <h1>QR Code</h1> */}
                        <h4>Title : {title}</h4>
                        <h4>URL : {inputVal}</h4>
                        <QRCode width={'300px'} height={'300px'} value={qrInput} renderAs="svg"></QRCode>
                    </div>
                </div>
            </div>
        </Holder>
    );
};

export default QRcode;