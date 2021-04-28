import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import style from './MainContainer.module.scss';

import Player from '../../components/Player/Player';
// import Holder from '../../elements/Holder/Holder';
import Symbols from '../../components/Symbols/Symbols';

class MainContainer extends Component {
    state = {

    }


    onItemClick = () => {

    }

    render() {
        return (
            <div className={style.mainContainer}>
                {/* <Holder></Holder> */}
                <Symbols></Symbols>
                <Player onItemClick={this.onItemClick}></Player>
            </div>
        )
    }
}

export default connect(null,null)(MainContainer);