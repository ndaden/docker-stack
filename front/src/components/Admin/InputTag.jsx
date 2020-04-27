import React, { useState, createRef } from 'react';

const InputTag = ({ placeholder, tags, allTags, addTagCb, removeTagCb, username }) => {
    const searchBox = createRef();
    const [query, setQuery] = useState('');
    const [addedTags, setAddedTags] = useState(tags.split(',').filter(t => t.length > 0));

    const removeTag = (e) => {
        const selectedTag = e.target.parentElement.dataset.value;
        removeTagCb(username, selectedTag).then(() => {
            setAddedTags(addedTags.filter(t => t !== selectedTag));
        }).catch((err) => console.log(err));
    };

    const addTag = (e) => {
        const selectedTag = e.target.dataset.value;
        if (!addedTags.includes(selectedTag)) {
            addTagCb(username, selectedTag).then(() => {
                setAddedTags([...addedTags, selectedTag]);
            }).catch((e) => console.log(e));
        }
        setQuery('');
        searchBox.current.value = '';
    }

    const search = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div style={{ position: 'relative' }}>
            <div className="field input is-grouped is-grouped-multiline" style={{ height: 'auto' }}>
                {addedTags.length > 0 && addedTags.map((t, k) => <span key={k} style={{ marginRight: '0.2rem' }} className="tag" data-value={t} title={t}>{t.substring(0, 3)}<button className="delete is-small" onClick={removeTag}></button></span>)}
                <input ref={searchBox} type="text" onChange={search} placeholder={placeholder} style={{ width: 'auto', paddingLeft: '0.5rem', fontSize: '1rem', border: '0px' }} />
            </div>
            {query.length > 1 && <div className="dropdown-content" style={{ position: 'absolute', zIndex: '3', width: '100%', padding: '0.75rem' }}>
                {allTags.filter(tag => tag.toLocaleUpperCase().includes(query.toLocaleUpperCase())).map((t, k) => <a key={k} className="dropdown-item" data-value={t} onClick={addTag}>{t}</a>)}
            </div>}
        </div>
    )
}

export default InputTag;