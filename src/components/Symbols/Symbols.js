
import React from 'react';

import Holder from '../../elements/Holder/Holder';
import Tile from '../../elements/Tile/Tile';

import style from './Symbols.module.scss';

/**
 * Primary UI component for user interaction
 */
const Symbols = ({ onCompClick, onCompClose }) => {


    const onCloseClick = (e) => {
        console.log('onCloseClick ' , e);
        onCompClose(e);
    }

    return (
        <Holder className={style.symbols} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={style.symbolsRow}>
                <Tile label="Individual Work"></Tile>
                <Tile label="Silence"></Tile>
                <Tile label="Teacher up front"></Tile>
            </div>
            <div  className={style.symbolsRow}>
                <Tile label="Entire class moving"></Tile>
                <Tile label="Partner work"></Tile>
                <Tile label="Work in groups"></Tile>
            </div>
        </Holder>
    );
};

export default Symbols;