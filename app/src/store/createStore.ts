import { applyMiddleware, createStore, Middleware, Reducer } from "redux";
import { SearchAction, SearchState } from "./modules/search/types";


export interface StoreState {
    search: SearchState;
}

// StoreAction contem todos os tipos da store, 
// export type StoreAction = SearchAction | ExemploAction | OutroAction
export type StoreAction = SearchAction;

export default (reducer: Reducer<StoreState, StoreAction>, middlewares: Middleware[]) => {

    const enhancer = applyMiddleware(...middlewares);

    return createStore(reducer, enhancer);
}