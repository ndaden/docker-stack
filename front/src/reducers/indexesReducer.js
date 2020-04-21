import * as Constants from '../actions/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case Constants.START_GET_INDEXES:
            return {
                ...state,
                isSearching: true,
            };
        case Constants.GET_INDEXES_OK:
            return {
                ...state,
                isSearching: false,
                indexes: action.result,
            };
        case Constants.GET_INDEXES_KO:
            return {
                ...state,
                isSearching: false,
                error: action.error,
            };
        default:
            return state;
    }
};
