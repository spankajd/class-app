import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScreenCapture } from 'react-screen-capture';
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

class MainContainer extends Component {
    state = {
        stageItems: [],
        screenCapture: '',

        background: {
            // type:'color',
            // data:'orange'
            type: 'image',
            data: 'https://source.unsplash.com/1600x900/?season'
        }
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
        // console.log('menuName ', menuName);
        const { stageItems } = this.state;
        const key = stageItems.length;

        switch (menuName) {
            case 'symbols':
                stageItems.push(<Symbols key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Symbols>)
                break;
            case 'number':
                stageItems.push(<Number key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Number>)
                break;
            case 'whoisnext':
                stageItems.push(<WhoIsNext key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></WhoIsNext>)
                break;
            case 'teacher':
                stageItems.push(<Teacher key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Teacher>)
                break;
            case 'timer':
                stageItems.push(<Timer key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Timer>)
                break;
            case 'text':
                stageItems.push(<Text key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Text>)
                break;
            case 'qrcode':
                stageItems.push(<QRcode key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></QRcode>)
                break;
            case 'webcam':
                stageItems.push(<WebCam key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></WebCam>)
                break;
            case 'background':
                stageItems.push(<Background key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)} dataset={backgroundPath} onChange={e => this.onBackgroundChange(e)}></Background>)
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

    render() {
        const { screenCapture, background } = this.state;

        const inlineStyle = {
            backgroundImage: background.type == 'image' ? `url("${background.data}")` : '',
            backgroundColor: background.type == 'color' ? background.data : '',
        }

        return (
            <ScreenCapture onEndCapture={this.handleScreenCapture}>
                {({ onStartCapture }) => (
                    <div className={style.mainContainer} style={inlineStyle}>
                        {this.renderItems()}
                        <Player onItemClick={e => this.onItemClick(e)} onScreenCapture={onStartCapture}></Player>
                        {screenCapture && (<ScreenShot imgPath={screenCapture} onClose={this.onScreenShotClose}></ScreenShot>)}
                    </div>)}
            </ScreenCapture>
        )
    }
}

export default connect(null, null)(MainContainer);