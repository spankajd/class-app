import React from 'react';



export const intervalForTimer = Comp => {
    
    
    return class extends React.Component {
        state = {
            startSec: 0,
            stopSec: 0,
            currentTime: this.props.currentSecond ||  0,
            factor: 1
        }
        
        intervalObj = null;

        setParams(param) {
            const {startSec, stopSec, currentTime, factor} = this.state;
            // console.log(param , this.state);
            this.setState({
                startSec: param.start || startSec,
                stopSec: param.stop || stopSec,
                currentTime: param.start || currentTime,
                factor: param.factor || factor
            })
        }

        startInterval() {
            const _thisRef = this;
            this.intervalObj && clearInterval(this.intervalObj);
            this.intervalObj = setInterval( () => {
                const {startSec, stopSec, currentTime, factor} = _thisRef.state;
                let newCurrentSec = currentTime + factor;
                // console.log('Interval >>>>' , _thisRef.state, newCurrentSec);
                
                if( ( startSec < stopSec && stopSec < newCurrentSec) || ( startSec > stopSec && stopSec > newCurrentSec) ) { 
                    clearInterval(_thisRef.intervalObj);
                    return false;
                }

                this.setState({
                    currentTime: newCurrentSec,
                });

            }, 1000);

        }

        stopInterval () {
            this.intervalObj && clearInterval(this.intervalObj);
        }

        render() {
            const { currentTime } = this.state;
            return <Comp {...this.props} currentSecond={currentTime} setParams={val => this.setParams(val)} startInterval={() => this.startInterval() } stopInterval={() => this.stopInterval() } />;
        }
    }

}