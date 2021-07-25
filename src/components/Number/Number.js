import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Holder from '../../elements/Holder/Holder';
import Dice from '../Dice/Dice';
import RandomNumber from '../RandomNumber/RandomNumber';
import ToggleButton from '../../elements/ToggleButton/ToggleButton';

import style from './Number.module.scss';


const Number = ({ onCompClick, onCompClose }) => {

    const { t, i18n } = useTranslation();
    const [selectedFlag, setSelectedFlag] = useState(false);

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onRadioChange = flag => {
        setSelectedFlag(flag);
    }

    return (
        <Holder className={`${style.number}`} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={style.labelRow}>
                <div className={style.labelContainer}>
                    <label className={!selectedFlag ? style.active : ''}>{t('number.dice')}</label>
                    <ToggleButton onChange={onRadioChange} />
                    <label className={selectedFlag ? style.active : ''}>{t('number.digit')}</label>
                </div>
            </div>
            <div className={style.row}>
                {selectedFlag ?
                    <RandomNumber></RandomNumber>
                    :
                    <Dice></Dice>
                }
            </div>
        </Holder>
    );
};

export default Number;