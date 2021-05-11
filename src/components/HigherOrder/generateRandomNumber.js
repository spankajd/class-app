import React from 'react';

export const generateRandomNumber = Comp => {

    return class extends React.Component {
        state = {
            numberOfDigits: 1,
            output: null
        }

        setNumberOfDigits(val) {
            this.setState({
                numberOfDigits: val,
                output: null
            })
        }

        generateNumber(isDice) {
            const { numberOfDigits } = this.state;
            let num = '';
            if (isDice) {
                for (let i = 0; i < numberOfDigits; i++) {
                    num += this.getRandomIntInclusive(1,6);
                }
            } else {
                num = this.getRadomNumber(numberOfDigits);
            }
            this.setState({
                output: num
            });
        }

        getRandomIntInclusive(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
        }

        getRadomNumber(n) {
            return Math.floor(Math.random() * (9 * Math.pow(10, n - 1))) + Math.pow(10, n - 1);
        }

        render() {
            const { output } = this.state;
            return <Comp {...this.props} output={output} setNumberOfDigits={val => this.setNumberOfDigits(val)} generateNumber={(isDice) => this.generateNumber(isDice)} />;
        }
    }

}