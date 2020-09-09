import * as constants from './constants';

export const parseMongoDbError = (error) => {
    if (error.name === constants.MONGO_ERROR && error.code === 11000) {
        const matched = error.errmsg.match(/{ : "(.*)" }/);
        const matchedWord = (matched && matched.length >= 2) ? matched[1] : "";
        return constants.DUPLICATE_RECORD(matchedWord);
    }
    return constants.TECHNICAL_ERROR;
};