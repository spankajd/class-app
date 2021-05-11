
import React from 'react';
import Holder from '../../elements/Holder/Holder';
import Dice from '../Dice/Dice';
import RandomNumber from '../RandomNumber/RandomNumber';

import style from './Number.module.scss';


const Number = ({  }) => {

    return (
        <Holder className={`${style.number}`}>
            <Dice></Dice>
            <RandomNumber></RandomNumber>
        </Holder>
    );
};

export default Number;