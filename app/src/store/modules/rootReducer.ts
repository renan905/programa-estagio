import { combineReducers } from 'redux';
import { StoreState } from '../createStore';

import search from './search/reducer';
import mapconfig from './mapconfig/reducer';
import mapdata from './mapdata/reducer';

export default combineReducers<StoreState>({
	search,
	mapconfig,
	mapdata,
})

