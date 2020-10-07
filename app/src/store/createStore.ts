import { applyMiddleware, createStore, Middleware, Reducer } from "redux";
import { LinhasState } from "./modules/linhas/types";
import { MapConfigState } from "./modules/mapconfig/types";
import { MapDataState } from "./modules/mapdata/types";
import { SearchAction, SearchState } from "./modules/search/types";


export interface StoreState {
	search: SearchState;
	mapconfig: MapConfigState;
	mapdata: MapDataState;
	linhas: LinhasState;
}

// StoreAction contem todos os tipos da store, 
// export type StoreAction = SearchAction | ExemploAction | OutroAction
export type StoreAction = SearchAction;

export default (reducer: Reducer<StoreState, StoreAction>, middlewares: Middleware[]) => {

    const enhancer = applyMiddleware(...middlewares);

    return createStore(reducer, enhancer);
}