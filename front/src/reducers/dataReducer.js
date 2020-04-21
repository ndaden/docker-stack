import * as Constants from '../actions/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case Constants.START_REQUEST:
            return {
                ...state,
                isSearching: true,
            };
        case Constants.REQUEST_OK:
            return {
                ...state,
                isSearching: false,
                result: action.result,
            };
        case Constants.REQUEST_KO:
            return {
                ...state,
                isSearching: false,
                error: action.error,
            };
        default:
            return state;
    }
};
