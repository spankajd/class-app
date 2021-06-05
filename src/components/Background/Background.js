
import React from 'react';
import Holder from '../../elements/Holder/Holder';

import Reel from '../../elements/Reel/Reel';

import style from './Background.module.scss';


const Background = ({ onCompClick, onCompClose, dataset, onChange }) => {

    const onCloseClick = e => {
        onCompClose(e);
    }

    return (
        <Holder className={`${style.background}`} onCompClick={onCompClick} onClose={onCloseClick}>
            {
                dataset.map(item => <Reel dataset={item} onSelect={onChange}/>)
            }
        </Holder>
    );
};

export default Background;