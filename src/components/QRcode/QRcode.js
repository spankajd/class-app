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
    const placeHolder = "https://www.klett-sprachen.de/";
    const [inputVal, setInputVal] = useState("");
    const [qrInput, setQrInput] = useState(placeHolder);
    const componentRef = useRef();

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

    return (
        <Holder className={style.qrcode} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={style.title}><TitleInput defaultVal={`Title ${count}`} /></div>
            <div className={style.subtitle}>{t('qrcode.instruction')}</div>
            <input className={style.input} type="text" placeholder={placeHolder} value={inputVal} onChange={onInputChange}></input>
            <div className={style.qrContainer} >
                <QRCode value={qrInput} renderAs="svg"></QRCode>
            </div>
            <Button primary label={t("whoisnext.print")} onClick={print} />

            <div className={style.printWrapper}>
                <div className={style.printPage} ref={componentRef}>
                    <center>
                        <h1>QR Code</h1>
                        <h3>For : {inputVal}</h3>
                        <QRCode value={qrInput} renderAs="svg"></QRCode>
                    </center>
                </div>
            </div>
        </Holder>
    );
};

export default QRcode;