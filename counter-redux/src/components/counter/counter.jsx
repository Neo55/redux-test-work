import React from "react";
import ReactDOM from 'react-dom';

import Store from '../../store/store';

const initialState = { count: 0 };

function updateState(state, action) {
    switch (action.type) {
        case 'increments': return { count: state.count + action.amount };
        case 'decrements': return { count: state.count - action.amount };
        case 'reset': return { count: 0 };
        default: return state;
    }
}

const incrementAction = { type: 'increments', amount: 1 };
const decrementAction = { type: 'decrements', amount: 1 };
const resetAction = { type: 'reset' };

const store = new Store(updateState, initialState);


export default class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    }

    increment() {
        store.update(incrementAction);
    }

    decrement() {
        store.update(decrementAction);
    }

    reset() {
        store.update(resetAction);
    }

    render() {
        return (
            <div className="counter">
                <span className="count">{store.state.count}</span>

                <div className="buttons">
                    <button className="decrement" onClick={this.decrement}>-</button>
                    <button className="reset" onClick={this.reset}>0</button>
                    <button className="increment" onClick={this.increment}>+</button>
                </div>
            </div>
        )
    }
}