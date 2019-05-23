import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import appReducers from './store/reducers';
import thunk from 'redux-thunk';

const reducers = combineReducers(Object.assign(appReducers));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers , composeEnhancers(
    applyMiddleware(thunk)
));

export default store;