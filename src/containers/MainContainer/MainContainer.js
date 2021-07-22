import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { ScreenCapture } from 'react-screen-capture';
import html2canvas from 'html2canvas';

import _ from 'lodash';

import style from './MainContainer.module.scss';

import Player from '../../components/Player/Player';
// import Holder from '../../elements/Holder/Holder';
import Symbols from '../../components/Symbols/Symbols';
import Number from '../../components/Number/Number';
import Teacher from '../../components/Teacher/Teacher';
import QRcode from '../../components/QRcode/QRcode';
import Timer from '../../components/Timer/Timer';
import Text from '../../components/Text/Text';
import WebCam from '../../components/WebCam/WebCam';
import ScreenShot from '../../components/ScreenShot/ScreenShot';
import Background from '../../components/Background/Background';

import backgroundPath from '../../assets/background';
import WhoIsNext from '../../components/WhoIsNext/WhoIsNext';
import GroupBuilder from '../../components/GroupBuilder/GroupBuilder';
import NoiseLevel from '../../components/NoiseLevel/NoiseLevel';
import SideControls from '../../components/SideControls/SideControls';

const limitedItems = ['symbols', 'teacher', 'whoisnext', 'groupbuilder', 'noiselevel', 'number', 'webcam', 'background'];

class MainContainer extends Component {
    state = {
        stageItems: [],
        openedItems: [],
        screenCapture: '',

        background: {
            // type:'color',
            // data:'orange'
            type: 'image',
            data: 'https://source.unsplash.com/1600x900/?season'
        }
    }

    constructor(props) {
        super(props);
        this.mainContainerRef = React.createRef();
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
        const { stageItems, openedItems } = this.state;
        let newOpenItems,
            newStageItems = stageItems.filter(comp => {
            if (comp.key == index) {
                newOpenItems = openedItems.filter(name => {
                    return name != comp.props['data-id']
                });
            }
            return comp.key != index;
        });

        this.setState({
            stageItems: newStageItems,
            openedItems : newOpenItems
        });
    }

    onItemClick = (menuName) => {
        const { stageItems, openedItems } = this.state;
        if( limitedItems.includes(menuName) && openedItems.includes(menuName) )
            return false;
        const key = stageItems.length;
        openedItems.push(menuName);
        let count = 0;
        openedItems.forEach( i => i === menuName ? count++ : null);
        switch (menuName) {
            case 'symbols':
                stageItems.push(<Symbols data-id={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Symbols>)
                break;
            case 'number':
                stageItems.push(<Number data-id={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Number>)
                break;
            case 'whoisnext':
                stageItems.push(<WhoIsNext data-id={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></WhoIsNext>)
                break;
            case 'groupbuilder':
                stageItems.push(<GroupBuilder data-id={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></GroupBuilder>)
                break;
            case 'noiselevel':
                stageItems.push(<NoiseLevel data-id={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></NoiseLevel>)
                break;
            case 'teacher':
                stageItems.push(<Teacher data-id={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Teacher>)
                break;
            case 'timer':
                stageItems.push(<Timer count={count} data-id={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Timer>)
                break;
            case 'text':
                stageItems.push(<Text count={count} data-id={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Text>)
                break;
            case 'qrcode':
                stageItems.push(<QRcode count={count} data-id={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></QRcode>)
                break;
            case 'webcam':
                stageItems.push(<WebCam data-id={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></WebCam>)
                break;
            case 'background':
                stageItems.push(<Background data-id={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)} dataset={backgroundPath} onChange={e => this.onBackgroundChange(e)}></Background>)
                break;
        }


        this.setState({
            stageItems: stageItems,
            openedItems: openedItems
        })
    }

    renderItems = () => {
        const { stageItems } = this.state;
        return stageItems.map(comp => {
            return comp
        })
    }

    handleScreenCapture = (screenCapture) => {
        // console.log('onScreenCapture ', e);
        this.setState({
            screenCapture: screenCapture
        });
    }

    onScreenShotClose = () => {
        this.setState({
            screenCapture: ''
        });
    }

    onBackgroundChange = obj => {
        this.setState({
            background: obj
        })
    }

    onStartCapture = () => {
        const _thisRef = this;
        // console.log('this.mainContainerRef.current ' , this.mainContainerRef.current)
        html2canvas(this.mainContainerRef.current).then(function (canvas) {
            // console.log('>>>>',canvas,canvas.toDataURL('image/jpeg', 0.5));
            _thisRef.handleScreenCapture(canvas.toDataURL('image/jpeg', 0.5));
            // document.body.appendChild(canvas);
        });
    }

    onClearAll = () => {
        this.setState({
            stageItems: [],
            openedItems: []
        })
    }

    render() {
        const { screenCapture, background, openedItems } = this.state;

        const inlineStyle = {
            backgroundImage: background.type == 'image' ? `url("${background.data}")` : '',
            backgroundColor: background.type == 'color' ? background.data : '',
        }

        return (
            <div className={style.mainContainer} style={inlineStyle} ref={this.mainContainerRef}>
                {this.renderItems()}
                <Player openedItems={openedItems} onItemClick={e => this.onItemClick(e)} onScreenCapture={e => this.onStartCapture()}></Player>
                <SideControls clearAll={() => this.onClearAll()}></SideControls>
                {screenCapture && (<ScreenShot imgPath={screenCapture} onClose={this.onScreenShotClose}></ScreenShot>)}
            </div>
        )
    }
}

export default connect(null, null)(MainContainer);