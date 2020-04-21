import * as Constants from '../actions/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case Constants.START_SEARCH:
            return {
                ...state,
                isSearching: true,
            };
        case Constants.SEARCH_OK:
            return {
                ...state,
                isSearching: false,
                searchResult: action.result,
            };
        case Constants.SEARCH_KO:
            return {
                ...state,
                isSearching: false,
                error: action.error,
            };
        default:
            return state;
    }
};
