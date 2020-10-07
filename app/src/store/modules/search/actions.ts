import {action} from 'typesafe-actions';

export function searchInput(  {searchValue, searchType } : { searchValue: string, searchType: string } ) {
    return action('@search/SEARCH_INPUT', {
		searchValue,
		searchType,
    })
}