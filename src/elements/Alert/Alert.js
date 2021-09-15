
import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../Button/Button';

import style from './Alert.module.scss';


const Alert = ({ msg, className='', onClose, cancelLabel, confirmLabel, onConfirm }) => {
    const { t, i18n } = useTranslation();

    const onConfirmClick = () => {
        if (onConfirm) {
            onConfirm();
        }
    }
    const onCancel = () => {
        if (onClose) {
            onClose();
        }
    }
    return <>{msg && <div className={`${style.alert}`}>
        <div className={`${style.container}`}>
            <div className={`${className} ${style.details}`}>
                {msg}
            </div>
            <div className={style.controls}>
                {confirmLabel && <Button primary label={confirmLabel} onClick={onConfirmClick} />}
                <Button primary={!confirmLabel} label={cancelLabel ? cancelLabel : t('whoisnext.cancel')} onClick={onCancel}></Button>
            </div>
        </div>
    </div>}</>;
};

export default Alert;