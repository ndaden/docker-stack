import * as Constants from '../actions/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case Constants.SIMPLE_ACTION:
            return {
                result: action.payload,
            };
        default:
            return state;
    }
};
