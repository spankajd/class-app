import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import style from './MainContainer.module.scss';

import Player from '../../components/Player/Player';
// import Holder from '../../elements/Holder/Holder';
import Symbols from '../../components/Symbols/Symbols';
import Number from '../../components/Number/Number';

class MainContainer extends Component {
    state = {
        stageItems: []
    }


    onCompClick = (index) => {
        const { stageItems } = this.state;
        let selectedComp;

        let newStageItems = stageItems.filter(comp => {
            if (comp.key == index) {
                selectedComp = comp;
            }
            return comp.key != index
        });

        newStageItems.push(selectedComp);

        this.setState({
            stageItems: newStageItems
        })
    }

    onCompClose = (index) => {
        const { stageItems } = this.state;
        let newStageItems = stageItems.filter(comp => {
            return comp.key != index
        });

        this.setState({
            stageItems: newStageItems
        })

    }

    onItemClick = (menuName) => {
        console.log('menuName ', menuName);
        const { stageItems } = this.state;
        const key = stageItems.length;

        switch (menuName) {
            case 'symbols':
                stageItems.push(<Symbols key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Symbols>)
                break;
            case 'number':
                stageItems.push(<Number key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Number>)
                break;
        }


        this.setState({
            stageItems: stageItems
        })
    }

    renderItems = () => {
        const { stageItems } = this.state;
        return stageItems.map(comp => {
            return comp
        })
    }

    render() {
        // const {stageItems} = this.state;
        return (
            <div className={style.mainContainer}>
                {/* <Holder></Holder> */}
                {/* <Symbols></Symbols> */}
                {this.renderItems()}
                <Player onItemClick={e => this.onItemClick(e)}></Player>
            </div>
        )
    }
}

export default connect(null, null)(MainContainer);