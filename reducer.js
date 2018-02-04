
function updateState(state, action) {
  if (action.type === 'increments') {
    return state + action.amount; 
  } else if (action.type === "decrements") {
      return state - action.amount; 
  } else {
      return state;
  }
}

class Store {
    constructor(updateState, state) {
        this._updateState = updateState;
        this._state = state;
        this._callbacks = [];
    }

    get state() {
        return this._state;
    }

    update (action) {
        this._state = this._updateState(this._state, action)
        this._callbacks.forEach(callback => callback());
    }

    subscribe(callback) {
        this._callbacks.push(callback);
        return () => this._callbacks = this._callbacks.filter(cb => cb!== callback);
    }
}

const store = new Store(updateState, 0);

const incrementAction = { type: 'increments', amount: 5 };
const decrementAction = { type: 'decrements', amount: 3 };

const unsubscribe = store.subscribe(() => console.log('State Changed 1 ', store.state));
store.subscribe(() => console.log('State Changed 2 ', store.state));

store.update(incrementAction);
unsubscribe();

store.update(decrementAction);

store.update({});