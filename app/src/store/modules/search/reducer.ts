import { SearchAction, SearchState } from "./types";


const initialState: SearchState = {
	searchValue: '',
	searchType: '',
}

export default function search( state = initialState, action: SearchAction): SearchState {
    switch (action.type) {
        case '@search/SEARCH_INPUT':
            return {
                ...state,
				searchValue: action.payload.searchValue,
				searchType: action.payload.searchType
            }
        
        default:
            return state;
    }
}