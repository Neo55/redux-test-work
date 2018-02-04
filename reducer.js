let state = 0;

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

    }

    get state() {
        return this._state;
    }

    update (action) {
        this._state = this._updateState(this._state, action)
    }
}

const store = new Store(updateState, 0);

const incrementAction = { type: 'increments', amount: 5 };
const decrementAction = { type: 'decrements', amount: 3 };

 store.update(incrementAction);
console.log(state);

store.update(decrementAction);
console.log(state);

store.update({});
console.log(state);