import React from 'react';
import '../css/Calculator.css';

class CalculatorScreen extends React.Component {

    render() {
        return (
            <div className="calculator-screen">11</div>
        )
    }

}


export default class Calculator extends React.Component {
    render() {
        return (
            <div className="calculator">
                <CalculatorScreen />
                <div className="calculator-button calculator-function">C</div>
                <div className="calculator-button calculator-function">+/-</div>
                <div className="calculator-button calculator-function">%</div>
                <div className="calculator-button calculator-operator">÷</div>
                <div className="calculator-button calculator-number">7</div>
                <div className="calculator-button calculator-number">8</div>
                <div className="calculator-button calculator-number">9</div>
                <div className="calculator-button calculator-operator">×</div>
                <div className="calculator-button calculator-number">4</div>
                <div className="calculator-button calculator-number">5</div>
                <div className="calculator-button calculator-number">6</div>
                <div className="calculator-button calculator-operator">-</div>
                <div className="calculator-button calculator-number">1</div>
                <div className="calculator-button calculator-number">2</div>
                <div className="calculator-button calculator-number">3</div>
                <div className="calculator-button calculator-operator">+</div>
                <div className="calculator-button calculator-number calculator-zero">0</div>
                <div className="calculator-button calculator-number">.</div>
                <div className="calculator-button calculator-operator">=</div>
            </div>
        )
    }
}