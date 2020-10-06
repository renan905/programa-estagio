import {action} from 'typesafe-actions';

export function searchInput( {searchValue} : {searchValue: string} ) {
    return action('@search/SEARCH_INPUT', {
        searchValue,
    })
}