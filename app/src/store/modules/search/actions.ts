import { action } from 'typesafe-actions';

export function searchInput(  {searchValue, searchType } : { searchValue: string, searchType: string } ) {
    return action('@search/SEARCH_INPUT', {
		searchValue,
		searchType,
    })
}

export function searchAutoUpdate(  { searchUpdate } : { searchUpdate: boolean } ) {
    return action('@search/SEARCH_UPDATE', {
		searchUpdate,
    })
}

export function searchNoResult(  { searchNoResults } : { searchNoResults: boolean } ) {
    return action('@search/SEARCH_NO_RESULTS', {
		searchNoResults,
    })
}