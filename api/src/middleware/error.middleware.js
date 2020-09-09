import { handleError } from '../models/ErrorHandler';

const errorHandling = (error, req, res, next) => {
    handleError(error, res);
};

export default errorHandling;