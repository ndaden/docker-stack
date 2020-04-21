import * as Constants from './constants';
import {
    ping,
    search,
    addDocument,
    createIndex,
    indexList,
    initIndexMapping,
    deleteAll,
    deleteDocument,
} from '../elasticsearch/init';

// ElasticSearch management methods

const startRequest = () => ({
    type: Constants.START_REQUEST,
});

const requestOk = result => ({
    type: Constants.REQUEST_OK,
    result,
});


const requestKo = error => ({
    type: Constants.REQUEST_KO,
    error,
});

// Indexes actions
const startGetIndexes = () => ({
    type: Constants.START_GET_INDEXES,
});

const getIndexesOk = result => ({
    type: Constants.GET_INDEXES_OK,
    result,
});

const getIndexesKo = error => ({
    type: Constants.GET_INDEXES_KO,
    error,
});

// Search actions
const startSearch = () => ({
    type: Constants.START_SEARCH,
});

const searchOk = result => ({
    type: Constants.SEARCH_OK,
    result,
});

const searchKo = error => ({
    type: Constants.SEARCH_KO,
    error,
});

// API Calls
const Ping = () => (
    (dispatch) => {
        dispatch(startRequest());
        ping().then(body => dispatch(requestOk(body)), error => dispatch(requestKo(error)));
    }
);

const CreateIndex = indexName => (
    (dispatch) => {
        dispatch(startRequest());
        createIndex(indexName)
            .then(body => dispatch(requestOk(body)),
                error => dispatch(requestKo(error)));
    }
);

const InitIndexMapping = (indexName, docType, payload) => (
    (dispatch) => {
        dispatch(startRequest());
        initIndexMapping(indexName, docType, payload)
            .then(body => dispatch(requestOk(body)),
                error => dispatch(requestKo(error)));
    }
);

const IndexList = () => (
    (dispatch) => {
        dispatch(startGetIndexes());
        indexList()
            .then(body => dispatch(getIndexesOk(body)),
                error => dispatch(getIndexesKo(error)));
    }
);

const CreateDocument = (indexName, _id, docType, payload) => (
    (dispatch) => {
        dispatch(startRequest());
        addDocument(indexName, _id, docType, payload)
            .then(body => dispatch(requestOk(body)),
                error => dispatch(requestKo(error)));
    }
);

const SearchDocument = (index, docType, payload) => (
    (dispatch) => {
        dispatch(startSearch());
        search(index, docType, payload)
            .then(body => dispatch(searchOk(body)),
                error => dispatch(searchKo(error)));
    }
);

const DeleteDocument = (index, _id, docType) => (
    (dispatch) => {
        dispatch(startRequest());
        return deleteDocument(index, _id, docType)
            .then(body => dispatch(requestOk(body)),
                error => dispatch(requestKo(error)));
    }
);

const DeleteEverything = () => (
    (dispatch) => {
        dispatch(startRequest());
        deleteAll()
            .then(body => dispatch(requestOk(body)),
                error => dispatch(requestKo(error)));
    }
);

export {
    Ping,
    CreateIndex,
    InitIndexMapping,
    IndexList,
    CreateDocument,
    SearchDocument,
    DeleteDocument,
    DeleteEverything,
};
