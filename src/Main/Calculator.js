import React, { Component } from 'react';
import './Calculator.css'
import Button from '../Components/Button';
import Display from '../Components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
}

class Calculator extends Component {

    state = { ...initialState };

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.setNumber = this.setNumber.bind(this);
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if(this.state.current === 0){
            this.setState({ operation, clearDisplay: true , current: 1 });
        }else {
            const finish = operation === '=';
            const currentOperation = this.state.operation;
            const values = [...this.state.values];
            
            switch(currentOperation){
                case '/':
                    values[0] = parseFloat(values[0]) / parseFloat(values[1]);
                    values[1] = 0;
                    break;
                case '*':
                    values[0] = parseFloat(values[0]) * parseFloat(values[1]);
                    values[1] = 0;
                    break;
                case '-':
                    values[0] = parseFloat(values[0]) - parseFloat(values[1]);
                    values[1] = 0;
                    break;
                case '+':
                    values[0] = parseFloat(values[0]) + parseFloat(values[1]);
                    values[1] = 0;
                    break;
                default:
                    console.log('nada');
            }
            console.log(values)
            this.setState({
                displayValue: values[0],
                operation: finish ? null : operation,
                current: finish ? 0 : 1,
                clearDisplay: !finish,
                values,
            })
        }
    }

    setNumber(n) {
        if(n === '.' && this.state.displayValue.includes('.')) {
            return;
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const current = clearDisplay ? '' : this.state.displayValue
        const displayValue = current + n;
        this.setState({ displayValue, clearDisplay: false })

        if(n !== '.') {
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({ values });
            console.log(values)
        }
            
    }

    render() {
        return (
            <div className="Calculator">
                <Display value={this.state.displayValue}></Display>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.setNumber} />
                <Button label="8" click={this.setNumber} />
                <Button label="9" click={this.setNumber} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.setNumber} />
                <Button label="5" click={this.setNumber} />
                <Button label="6" click={this.setNumber} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.setNumber} />
                <Button label="2" click={this.setNumber} />
                <Button label="3" click={this.setNumber} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.setNumber} double />
                <Button label="." click={this.setNumber} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}

export default Calculator;