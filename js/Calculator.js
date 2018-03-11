import React from 'react';
import '../css/Calculator.css';

const operatorToFix = 1000000;
const operatorMap = {
    '/': (firstOperand, secondOperand) => (firstOperand * operatorToFix) / (secondOperand * operatorToFix),
    '*': (firstOperand, secondOperand) => (firstOperand * operatorToFix) * (secondOperand * operatorToFix) / operatorToFix / operatorToFix,
    '+': (firstOperand, secondOperand) => (firstOperand * operatorToFix + secondOperand*operatorToFix)/operatorToFix,
    '-': (firstOperand, secondOperand) => (firstOperand * operatorToFix - secondOperand*operatorToFix)/operatorToFix,
}

const CalculatorScreen = ({result}) => {
    let resultDisplay = result;
    //if (Number.isNaN(result)) {
    //    resultDisplay = "Not a number"
    //} else {
    //    resultDisplay = Number(result).toLocaleString("en-US", { maximumSignificantDigits: 10 });
    //}
    return <div className="calculator-screen">{resultDisplay}</div>
}

export default class Calculator extends React.Component {

    state = {
        firstOperand: 0,
        operator: null,
        result: "0",//result to display
        /*
         flag your last typed, 1 is number, 2 is operation(+,-,*,/), 3 is '='
         */
        lastClickedFlag: 1,
        /*
        for supporting subsequent '='
         */
        preSecondOperand : null,

        /*
         1+2=2+ not new result
         1+2+ should get result
         */
        lastOperatorIsEqual: false
    }

    handleButtonClick = (type, text, flag) => {
        if (type == 1) {
            if (flag == 1) {

            } else if (flag == 2) {

            } else if (flag == 3) {

            }
        } else if (type == 2) {
            if (this.state.operator) {
                if (this.state.lastClickedFlag === 2 && flag !== '=') {//you just clicked operator, so just change operator
                    this.setState({
                        operator: flag
                    });
                    return;
                }

                const stateResult = this.state.result;
                const stateOperator = this.state.operator;
                //1+2=2+ not new result, 1+2+ should get result
                //1+2==+
                if (flag !== '=' && this.state.lastOperatorIsEqual) {
                    this.setState({
                        firstOperand: stateResult,
                        operator: flag,
                        lastClickedFlag: 2
                    });
                    return;
                }
                let nextResult = 0;
                let nextOperator = flag === '=' ? stateOperator : flag;
                let nextPreSecondOperand = this.state.preSecondOperand;
                //1+3==
                if ( (this.state.lastClickedFlag === 3 ) && flag === '=') {//subsequent '='
                    nextResult = operatorMap[stateOperator](stateResult, this.state.preSecondOperand);
                    nextOperator = stateOperator;
                } else {
                    console.log(this.state.preSecondOperand);
                    nextResult = operatorMap[stateOperator](this.state.firstOperand, parseFloat(stateResult));
                    if (flag !== '=') {
                        nextPreSecondOperand = parseFloat(stateResult);
                    } else {
                        nextPreSecondOperand = parseFloat(stateResult);
                    }
                }
                this.setState({
                    result: nextResult,
                    firstOperand: nextResult,
                    operator: nextOperator,
                    lastClickedFlag: flag === '=' ? 3 : 2,
                    preSecondOperand: nextPreSecondOperand,
                    lastOperatorIsEqual: flag === '='
                });
            } else {
                this.setState({
                    operator: flag === '=' ? null : flag,
                    firstOperand: parseFloat(this.state.result),
                    lastClickedFlag: flag === '=' ? 3 : 2
                });
            }
        } else if (type == 3) {//number clicked
            if (this.state.lastClickedFlag === 1) {//last typed is number, try to append
                let preResult = this.state.result.toString();
                if (preResult === "0") {
                    this.setState({
                        result: text,
                    });
                } else {//append
                    if (preResult.indexOf(".") < 0 || text !== ".") {// can't be more than 2 "." for number
                        this.setState({
                            result: preResult + text
                        });
                    }
                }
            } else {//go new number to display
                this.setState({
                    result: text === "." ? "0." : text,
                    lastClickedFlag: 1
                });
            }
        }
    }

    renderButton(type, text, flag) {
        flag = flag ? flag : text;
        let buttonClass = ["calculator-button"];
        switch (type) {
            case 1:
                buttonClass.push("calculator-function");
                break;
            case 2:
                buttonClass.push("calculator-operator");
                break;
            case 3:
                buttonClass.push("calculator-number");
                break;
            default :
                break;
        }
        if (text == "0") {
            buttonClass.push("calculator-zero");
        }
        if (type === 2 && flag === this.state.operator && this.state.lastClickedFlag === 2) {
            buttonClass.push("calculator-operator--active");
        }
        return (
            <div className={buttonClass.join(' ')} onClick={()=>this.handleButtonClick(type, text, flag)}>{text}</div>
        )
    }
    render() {
        return (
            <div className="calculator">
                <CalculatorScreen result={this.state.result} />
                {this.renderButton(1, "C", 1)}
                {this.renderButton(1, "+/-", 2)}
                {this.renderButton(1, "%", 3)}
                {this.renderButton(2, "÷", '/')}
                {this.renderButton(3, "7")}
                {this.renderButton(3, "8")}
                {this.renderButton(3, "9")}
                {this.renderButton(2, "×", '*')}
                {this.renderButton(3, "4")}
                {this.renderButton(3, "5")}
                {this.renderButton(3, "6")}
                {this.renderButton(2, "-", '-')}
                {this.renderButton(3, "1")}
                {this.renderButton(3, "2")}
                {this.renderButton(3, "3")}
                {this.renderButton(2, "+", '+')}
                {this.renderButton(3, "0")}
                {this.renderButton(3, ".", '.')}
                {this.renderButton(2, "=", '=')}
            </div>
        )
    }
}