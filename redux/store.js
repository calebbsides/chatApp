import {
    createStore,
    applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import { reducer } from './reducer';

// STORE

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };