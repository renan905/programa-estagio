import { combineReducers } from 'redux';
import { StoreState } from '../createStore';

import search from './search/reducer';

export default combineReducers<StoreState>({
    search,
})

