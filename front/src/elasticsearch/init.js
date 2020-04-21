import { Client } from 'elasticsearch';
import * as config from './config';

const esClient = new Client({
  host: config.ELASTICSEARCH_HOST,
  log: config.ELASTICSEARCH_LOG,
});

const ping = () => esClient.ping({
    requestTimeout: 30000,
  });

const createIndex = indexName => esClient.indices.create({ index: indexName });

const indexExists = indexName => esClient.indices.exists({ index: indexName });

const indexList = () => esClient.indices.get({ index: '_all' });

const initIndexMapping = (indexName, docType, payload) => esClient.indices.putMapping({
    index: indexName,
    type: docType,
    body: payload,
  });


const addDocument = (indexName, _id, docType, payload) => esClient.index({
    index: indexName,
    type: docType,
    id: _id,
    body: payload,
  });


const updateDocument = (indexName, _id, docType, payload) => {
  esClient.update({
    index: indexName,
    type: docType,
    id: _id,
    body: payload,
  }, (error, response) => {
    if (error) {
      return error;
    }
    return response;
  });
};

const search = (indexName, docType, payload) => esClient.search({
    index: indexName,
    type: docType,
    body: payload,
  });


const deleteDocument = (indexName, _id, docType) => esClient.delete({
    index: indexName,
    type: docType,
    id: _id,
  });

const deleteAll = () => esClient.indices.delete({
    index: '_all',
  });

export {
  ping,
  createIndex,
  indexExists,
  indexList,
  initIndexMapping,
  addDocument,
  updateDocument,
  search,
  deleteDocument,
  deleteAll,
};
