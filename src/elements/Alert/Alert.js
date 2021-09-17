
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';

import Button from '../Button/Button';

import style from './Alert.module.scss';


const Alert = ({ msg, className = '', onClose, cancelLabel, confirmLabel, onConfirm, maxHeight = 200 }) => {
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
                <Scrollbars
                    autoHeight
                    autoHide
                    autoHeightMax={maxHeight}
                >
                    {msg}
                </Scrollbars>
            </div>
            <div className={style.controls}>
                <Button primary={!confirmLabel} label={cancelLabel ? cancelLabel : t('whoisnext.cancel')} onClick={onCancel}></Button>
                {confirmLabel && <Button primary label={confirmLabel} onClick={onConfirmClick} />}
            </div>
        </div>
    </div>}</>;
};

export default Alert;