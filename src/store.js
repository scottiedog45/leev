import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {leevReducer} from './reducers';

export default createStore(leevReducer, applyMiddleware(thunk));
