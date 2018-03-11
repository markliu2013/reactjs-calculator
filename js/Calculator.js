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
    if (Number.isNaN(result)) {
        resultDisplay = "Not a number"
    } else {
        if (resultDisplay !== "-0" && resultDisplay !== "0.") {
            resultDisplay = Number(result).toLocaleString("en-US", { maximumSignificantDigits: 10 });
        }
    }
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
        lastOperatorIsEqual: false,

        /*
        flag you clear button, AC, C
         */
        clearFlag: false,
        /*
        1+2, then clear, and clear
         */
        clearOperator: false
    }

    handleButtonClick = (type, text, flag) => {
        if (type == 1) {
            if (flag == 1) {
                if (this.state.operator) {
                    if (this.state.clearOperator) {
                        this.setState({
                            operator: null,
                            lastClickedFlag: 1,
                            result: "0",
                            clearFlag: false,
                            clearOperator: false
                        });
                    } else {
                        this.setState({
                            lastClickedFlag: 2,
                            result: "0",
                            clearFlag: false,
                            clearOperator: true
                        });
                    }
                } else {
                    this.setState({
                        result: "0",
                        clearFlag: false
                    });
                }
            } else if (flag == 2) {
                const stateResult = this.state.result;
                if (stateResult === "0") {
                    this.setState({
                        result: "-0"
                    });
                } else if (stateResult === "-0") {
                    this.setState({
                        result: "0"
                    });
                } else {
                    this.setState({
                       result: Number(stateResult) * -1
                    });
                }
            } else if (flag == 3) {
                const stateResult = this.state.result;
                this.setState({
                    result: Number(stateResult) / 100
                });
            }
        } else if (type == 2) {
            if (this.state.operator) {
                if (this.state.lastClickedFlag === 2 && flag !== '=') {//you just clicked operator, so just change operator
                    this.setState({
                        operator: flag,
                        lastOperatorIsEqual: false
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
                        lastClickedFlag: 2,
                        lastOperatorIsEqual: false
                    });
                    return;
                }
                let nextResult = 0;
                let nextOperator = flag === '=' ? stateOperator : flag;
                let nextPreSecondOperand = this.state.preSecondOperand;
                //1+3==
                if ((this.state.lastClickedFlag === 3 || this.state.lastOperatorIsEqual) && flag === '=') {//subsequent '='
                    nextResult = operatorMap[stateOperator](stateResult, this.state.preSecondOperand);
                    nextOperator = stateOperator;
                } else {
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
                        clearFlag: true
                    });
                } else {//append
                    if (preResult.indexOf(".") < 0 || text !== ".") {// can't be more than 2 "." for number
                        this.setState({
                            result: preResult + text,
                            clearFlag: true
                        });
                    }
                }
            } else {//go new number to display
                this.setState({
                    result: text === "." ? "0." : text,
                    lastClickedFlag: 1,
                    clearFlag: true
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
        let displayText = text;
        if (type === 1 && flag === 1 && this.state.clearFlag) {
            displayText = "C";
        }
        return (
            <div className={buttonClass.join(' ')} onClick={()=>this.handleButtonClick(type, text, flag)}>{displayText}</div>
        )
    }
    render() {
        return (
            <div className="calculator">
                <CalculatorScreen result={this.state.result} />
                {this.renderButton(1, "AC", 1)}
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