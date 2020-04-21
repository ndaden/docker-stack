import * as Constants from './constants';

export const simpleAction = () => (dispatch) => {
    dispatch({
        type: Constants.SIMPLE_ACTION,
        payload: 'result of simple action',
    });
};
