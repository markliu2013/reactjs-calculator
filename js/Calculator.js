import React from 'react';
import '../css/Calculator.css';

function CalculatorScreen(props) {
    return (
        <div className="calculator-screen">{props.result}</div>
    )
}

export default class Calculator extends React.Component {

    renderButton(type, text) {
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
            <div className={buttonClass}>{text}</div>
        )
    }
    render() {
        return (
            <div className="calculator">
                <CalculatorScreen result="123" />
                {this.renderButton(1, "C")}
                {this.renderButton(1, "+/-")}
                {this.renderButton(1, "%")}
                {this.renderButton(2, "÷")}
                {this.renderButton(3, "7")}
                {this.renderButton(3, "8")}
                {this.renderButton(3, "9")}
                {this.renderButton(2, "×")}
                {this.renderButton(3, "4")}
                {this.renderButton(3, "5")}
                {this.renderButton(3, "6")}
                {this.renderButton(2, "-")}
                {this.renderButton(3, "1")}
                {this.renderButton(3, "2")}
                {this.renderButton(3, "3")}
                {this.renderButton(2, "+")}
                {this.renderButton(3, "0")}
                {this.renderButton(3, ".")}
                {this.renderButton(2, "=")}
            </div>
        )
    }
}