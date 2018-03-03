import React from 'react';
import '../css/Calculator.css';

function CalculatorScreen(props) {
    return (
        <div className="calculator-screen">{props.result}</div>
    )
}

const operatorMap = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
}

export default class Calculator extends React.Component {



    state = {
        firstOperand: 0,
        operator: null,
        result: 0,//number to display
        /*
         flag if you just click operator function button,
         it means you are going to input next operand
         */
        isNextOperand: true,
    }

    handleButtonClick = (type, text, flag) => {
        if (type == 1) {
            if (flag == 1) {

            } else if (flag == 2) {

            } else if (flag == 3) {

            }
        } else if (type == 2) {
            if (this.state.operator) {
                let preResult = parseFloat(this.state.result);
                let preOperator = this.state.operator;
                let nextResult = operatorMap[preOperator](this.state.firstOperand, preResult);
                this.setState({
                    result: nextResult,
                    firstOperand: nextResult,
                    operator: flag == '=' ? null : flag,
                    isNextOperand: true,
                });
            } else {
                this.setState({
                    operator: flag,
                    firstOperand: parseFloat(this.state.result),
                    isNextOperand: true,
                });
            }
        } else if (type == 3) {
            let preResult = this.state.result.toString();
            if (this.state.isNextOperand) {
                this.setState({
                    result: text == "." ? "0." : text,
                    isNextOperand: false
                });
            } else {
                if (preResult != "0") {
                    let newResult = preResult + "" + text;
                    if (!isNaN(newResult)) {
                        this.setState({
                            result: newResult,
                            isNextOperand: false
                        });
                    }
                } else {
                    this.setState({
                        result: text,
                        isNextOperand: false
                    });
                }
            }
        }
    }

    renderButton(type, text, flag) {
        flag = flag ? flag : text;
        let buttonClass = "calculator-button";
        switch (type) {
            case 1:
                buttonClass = buttonClass + " calculator-function";
                break;
            case 2:
                buttonClass = buttonClass + " calculator-operator";
                break;
            case 3:
                buttonClass = buttonClass + " calculator-number";
                break;
            default :
                break;
        }
        if (text == "0") {
            buttonClass = buttonClass + " calculator-zero";
        }
        return (
            <div className={buttonClass} onClick={()=>this.handleButtonClick(type, text, flag)}>{text}</div>
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