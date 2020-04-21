import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Ping,
    DeleteEverything,
    CreateIndex,
    IndexList,
    InitIndexMapping,
    CreateDocument,
    SearchDocument,
    DeleteDocument,
} from '../actions/dataActions';
import { UserContext } from '../providers/UserContextProvider';
import * as EsQuery from '../elasticsearch/query';

const ElasticTool = (props) => {
    const [indexName, setindexName] = useState('');
    const [selectedindexName, setselectedindexName] = useState('');
    const [indexMapping, setindexMapping] = useState('');
    const [documentName, setdocumentName] = useState('');
    const [searchQuery, setsearchQuery] = useState('');
    const [ismodalactive, setismodalactive] = useState(false);
    const [currentDocumentId, setcurrentDocumentId] = useState('');
    const [currentIndex, setcurrentIndex] = useState('');

    const {
        dispatch,
        isSearching,
        result,
        indexes,
        search,
        error,
    } = props;

    const userContext = useContext(UserContext);
    const { user } = userContext;
    if (!user.isAuthenticated) {
        return <Redirect to="/signin" />;
    }

    useEffect(() => {
        dispatch(IndexList());
    }, [result]);

    const pingElasticsearch = () => {
        dispatch(Ping());
    };

    const purgeElasticsearch = () => {
        dispatch(DeleteEverything());
    };

    const createElasticSearchIndex = (name) => {
        dispatch(CreateIndex(name));
    };

    const createElasticSearchDocument = (index, payload) => {
        dispatch(CreateDocument(index, null, null, payload));
    };

    const searchElasticSearch = (index, payload) => {
        dispatch(SearchDocument(index, null, payload));
    };

    const createIndexMapping = (index, payload) => {
        dispatch(InitIndexMapping(index, null, payload));
    };

    const showDeleteModal = (index, documentId) => {
        setcurrentDocumentId(documentId);
        setcurrentIndex(index);
        setismodalactive(true);
    };

    const deleteDocument = (index, documentId) => {
        dispatch(DeleteDocument(index, documentId));
        setismodalactive(false);
        setTimeout(() => {
            searchElasticSearch(index, EsQuery.ElasticSearchMatchAll);
        }, 1500);
    };

    return (
        <div>
            <section className="section">
                <div className="container">
                    <h1 className="title">ElasticSearch Admin Tool</h1>
                    <div className="level">
                        <div className="level-item">
                            <button className="button is-primary" onClick={pingElasticsearch}>Ping</button>
                        </div>
                        <div className="level-item">
                            <button className="button is-primary" onClick={purgeElasticsearch}>Purge</button>
                        </div>
                        <div className="level-item">
                            <div className="field has-addons">
                                <div className="control">
                                    <input type="text" className="input" name="indexName" onChange={e => setindexName(e.target.value)} placeholder="Index name" />
                                </div>
                                <div className="control">
                                    <button className="button is-primary" onClick={() => createElasticSearchIndex(indexName)}>New Index</button>
                                    <button className="button is-primary" onClick={() => searchElasticSearch(selectedindexName, EsQuery.ElasticSearchMatchAll)}>GET ALL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="level">
                        <div className="level-item">
                            <div className="control">
                                <div className="select">
                                    <select name="selectedindexName" onChange={e => setselectedindexName(e.target.value)}>
                                        <option>-- Choisir un index --</option>
                                        {indexes && Object.keys(indexes).map(
                                            index => (
                                                <option value={index} key={index}>{index}</option>),
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="level-item">
                            <div className="field has-addons">
                                <div className="control">
                                    <input type="text" className="input" name="indexMapping" onChange={e => setindexMapping(e.target.value)} placeholder="Index Mapping" />
                                </div>
                                <div className="control">
                                    <button className="button is-primary" onClick={() => createIndexMapping(selectedindexName, indexMapping)}>Create Mapping</button>
                                </div>
                            </div>
                        </div>
                        <div className="level-item">
                            <div className="field has-addons">
                                <div className="control">
                                    <input type="text" className="input" name="documentName" onChange={e => setdocumentName(e.target.value)} placeholder="Document name" />
                                </div>
                                <div className="control">
                                    <button className="button is-primary" onClick={() => createElasticSearchDocument(selectedindexName, documentName)}>New Document</button>
                                </div>
                            </div>
                        </div>
                        <div className="level-item">
                            <div className="field has-addons">
                                <div className="control">
                                    <input type="text" className="input" name="searchQuery" onChange={e => setsearchQuery(e.target.value)} placeholder="Query" />
                                </div>
                                <div className="control">
                                    <button className="button is-primary" onClick={() => searchElasticSearch(selectedindexName, searchQuery)}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="notification is-primary">
                                <button className="delete"> </button>
                                <p>
                                    {result && JSON.stringify(result)}
                                    {error && JSON.stringify(error)}
                                </p>
                            </div>
                        </div>
                        <div className="column">
                            <div className="notification is-primary">
                                {search
                                    && search.searchResult
                                    && search.searchResult.hits.hits.map(res => (
                                        <div className="box" key={res._id}>
                                            <article className="media">
                                                <div className="media-content">
                                                    <div className="content">
                                                        <div className="level">
                                                            <div className="level-right">
                                                                <div className="level-item">
                                                                    <button className="delete" onClick={() => showDeleteModal(res._index, res._id)}> </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p>{`Index : ${res._index}`}</p>
                                                        <p>{`Type : ${res._type}`}</p>
                                                        <p>{`ID : ${res._id}`}</p>
                                                        <p>{`Score : ${res._score}`}</p>
                                                        <p>Content :</p>
                                                        <pre>
                                                            {JSON.stringify(res._source)}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="level">
                        <div className="level-item">
                            {isSearching && <progress className="progress is-small is-dark" max="100">10%</progress>}
                        </div>
                    </div>
                </div>
            </section>
            <div className={`modal ${ismodalactive && 'is-active is-clipped'}`}>
                <div className="modal-background"> </div>
                <div className="modal-content">
                    <div className="box">
                        <article>
                            <div className="media">
                                <div className="media-content">Voulez-vous vraiment supprimer ce document ?</div>
                                <button className="button" onClick={() => deleteDocument(currentIndex, currentDocumentId)}>Oui</button>
                                <button className="button" onClick={() => setismodalactive(false)}>Non</button>
                            </div>
                        </article>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => setismodalactive(false)}> </button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isSearching: state.data.isSearching,
    result: state.data.result,
    indexes: state.indexes.indexes,
    error: state.data.error,
    search: state.search,
});
export default connect(mapStateToProps)(ElasticTool);
