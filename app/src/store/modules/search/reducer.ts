import { SearchAction, SearchState } from "./types";


const initialState: SearchState = {
	searchValue: '',
	searchType: '',
	searchUpdate: false,
	searchNoResults: false,
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

		case '@search/SEARCH_NO_RESULTS':
			return {
				...state,
				searchNoResults: action.payload.searchNoResults
			}
        
        default:
            return state;
    }
}