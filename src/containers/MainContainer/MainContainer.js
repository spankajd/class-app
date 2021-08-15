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
        randomStudentInput: '',
        randomStudentList: [],
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

    onCompClose = (index, dataId) => {
        const { stageItems, openedItems } = this.state;

        let newOpenItems, curItemName,
            newStageItems = stageItems.filter(comp => {
                curItemName = comp.props['dataId'];
                if (comp.key == index) {
                    newOpenItems = openedItems.filter(name => {
                        return name != curItemName;
                    });
                }
                return comp.key != index;
            });

        if (curItemName == 'whoisnext' || curItemName == 'groupbuilder') {
            this.setState({
                stageItems: newStageItems,
                openedItems: newOpenItems,
                randomStudentInput: '',
                randomStudentList: []
            });

        } else {
            this.setState({
                stageItems: newStageItems,
                openedItems: newOpenItems
            });

        }
    }

    randomStudentUpdate = ({ type, data }) => {
        let tempObj = {};
        tempObj[type == 'inputStage' ? 'randomStudentInput' : 'randomStudentList'] = data;
        this.setState(tempObj);
    }

    checkRandomStudentTask = (stageItems, openedItems, closeTask) => {
        let curItemName;
        stageItems = stageItems.filter(comp => {
            curItemName = comp.props['dataId'];
            if (closeTask == curItemName) {
                openedItems = openedItems.filter(name => {
                    return name != curItemName;
                });
            }
            return closeTask != curItemName;
        });
        return {
            newStageItems: stageItems,
            newOpenedItems: openedItems
        };
    }

    onItemClick = (menuName) => {
        let { stageItems, openedItems, randomStudentList, randomStudentInput } = this.state;
        if (limitedItems.includes(menuName) && openedItems.includes(menuName))
            return false;
        const key = Math.floor((Math.random() * 100000) + 1);
        let proccessedArr;
        openedItems.push(menuName);
        let count = 0;
        openedItems.forEach(i => i === menuName ? count++ : null);
        switch (menuName) {
            case 'symbols':
                stageItems.push(<Symbols dataId={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Symbols>)
                break;
            case 'number':
                stageItems.push(<Number dataId={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Number>)
                break;
            case 'whoisnext':
                stageItems.push(<WhoIsNext dataId={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)} onRandomStudentUpdate={e => this.randomStudentUpdate(e)} sharedList={randomStudentList} sharedInputStage={randomStudentInput}></WhoIsNext>)
                proccessedArr = this.checkRandomStudentTask(stageItems, openedItems, 'groupbuilder');
                stageItems = proccessedArr.newStageItems;
                openedItems = proccessedArr.newOpenedItems;
                break;
            case 'groupbuilder':
                stageItems.push(<GroupBuilder dataId={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)} onRandomStudentUpdate={e => this.randomStudentUpdate(e)} sharedList={randomStudentList} sharedInputStage={randomStudentInput}></GroupBuilder>)
                proccessedArr = this.checkRandomStudentTask(stageItems, openedItems, 'whoisnext');
                stageItems = proccessedArr.newStageItems;
                openedItems = proccessedArr.newOpenedItems;
                break;
            case 'noiselevel':
                stageItems.push(<NoiseLevel dataId={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></NoiseLevel>)
                break;
            case 'teacher':
                stageItems.push(<Teacher dataId={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Teacher>)
                break;
            case 'timer':
                stageItems.push(<Timer count={count} dataId={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Timer>)
                break;
            case 'text':
                stageItems.push(<Text count={count} dataId={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></Text>)
                break;
            case 'qrcode':
                stageItems.push(<QRcode count={count} dataId={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></QRcode>)
                break;
            case 'webcam':
                stageItems.push(<WebCam dataId={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)}></WebCam>)
                break;
            case 'background':
                stageItems.push(<Background dataId={menuName} key={key} onCompClick={() => this.onCompClick(key)} onCompClose={() => this.onCompClose(key)} dataset={backgroundPath} onChange={e => this.onBackgroundChange(e)}></Background>)
                break;
        }


        this.setState({
            stageItems: stageItems,
            openedItems: openedItems
        })
    }

    renderItems = () => {
        const { stageItems } = this.state;
        console.log('renderItems ', stageItems);
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
        html2canvas(this.mainContainerRef.current, {
            useCORS: true, ignoreElements: (element) => {
                if (element.id === "player" || element.id === "sidecontrols")
                    return true;
            }
        }).then(function (canvas) {
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
                <Player openedItems={openedItems} onItemClick={e => this.onItemClick(e)} onScreenCapture={e => this.onStartCapture()} id="player"></Player>
                <SideControls clearAll={() => this.onClearAll()} disableClearButton={openedItems.length == 0} id="sidecontrols"></SideControls>
                {screenCapture && (<ScreenShot imgPath={screenCapture} onClose={this.onScreenShotClose}></ScreenShot>)}
            </div>
        )
    }
}

export default connect(null, null)(MainContainer);