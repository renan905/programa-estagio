import { SearchAction, SearchState } from "./types";


const initialState: SearchState = {
    searchValue: '',
}

export default function search( state = initialState, action: SearchAction): SearchState {
    switch (action.type) {
        case '@search/SEARCH_INPUT':
            return {
                ...state,
                searchValue: action.payload.searchValue
            }
        
        default:
            return state;
    }
}