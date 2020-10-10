import { SearchAction, SearchState } from "./types";


const initialState: SearchState = {
	searchValue: '',
	searchType: '',
	searchUpdate: false,
}

export default function search( state = initialState, action: SearchAction): SearchState {
    switch (action.type) {
        case '@search/SEARCH_INPUT':
            return {
                ...state,
				searchValue: action.payload.searchValue,
				searchType: action.payload.searchType,
				
			}
			
		case '@search/SEARCH_UPDATE':
			return {
				...state,
				searchUpdate: action.payload.searchUpdate
			}
        
        default:
            return state;
    }
}