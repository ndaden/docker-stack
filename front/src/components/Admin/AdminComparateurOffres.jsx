import React, { useState } from 'react';
import uuid from 'uuid';

const AdminComparateurOffres = () => {
    const [jsonData, setJsonData] = useState({ fields: [], rows: [], filters: [] });
    const [hideFilters, setHideFilters] = useState(true);
    const [showSave, setShowSave] = useState({});
    const [field, setField] = useState('');

    const [filter, setFilter] = useState({ label: '', choices: [] });
    const [choice, setChoice] = useState({ label: '', values: [] });

    const [row, setRow] = useState({ fields: [] });
    const [rowFields, setRowFields] = useState({});

    const [rowFieldsByUuid, setRowFieldsByUuid] = useState([]);

    const handleChangeField = (ev) => {
        setField(ev.target.value);
    };

    const handleChangeRowLabel = (ev) => {
        setRow({ ...row, label: ev.target.value });
    };

    const handleChangeRowValue = (ev) => {
        setRow({ ...row, value: ev.target.value });
    };

    const handleAddFieldToRow = (ev) => {
        setRowFields({ ...rowFields, [ev.target.name]: ev.target.value });
        console.log(rowFields);
    };

    const addField = () => {
        let localRows = jsonData.rows;
        localRows.map((r, id) => {
            localRows[id].fields = [...r.fields, ''];
        });
        setJsonData({ ...jsonData, rows: [...localRows], fields: [...jsonData.fields, field] });
    };

    const addRow = () => {
        let fieldsToAdd = [...Object.values(rowFields)];
        
        const generatedUuid = uuid.v4();
        setRowFieldsByUuid([...rowFieldsByUuid, {uuid: uuid, fields: fieldsToAdd}]);

        setJsonData({ ...jsonData, rows: [...jsonData.rows, { ...row, fields: fieldsToAdd, uuid: generatedUuid }] });
        setRowFields({});
        setRow({});
    };

    const handleChangeJson = (ev) => {
        
        let pastedJson = JSON.parse(ev.target.value);
        pastedJson.rows.map((r, id) => {
            const generatedUuid = uuid.v4();
            pastedJson.rows[id].uuid = generatedUuid;
            setRowFieldsByUuid([...rowFieldsByUuid.filter(rf => rf.uuid !== generatedUuid), { uuid: generatedUuid, fields: pastedJson.rows[id].fields}]);
        });

        setJsonData(pastedJson);
    };

    const copyJson = () => {
        const copyText = document.querySelector("#resultatJson");
        copyText.select();
        document.execCommand("copy");
    };

    /* */
    const [choix, setChoix] = useState([]);
    const handleCheck = (ev) => {
        let newChoix = [];
        if (ev.target.checked) {
            newChoix = [...choix.filter(c => c !== ev.target.value), ev.target.value];
        } else {
            newChoix = [...choix.filter(c => c !== ev.target.value)];
        }
        setChoix([...newChoix]);
        console.log(newChoix);
    };

    const handleLabelChoix = (ev) => {
        setChoice({ ...choice, label: ev.target.value });
    };

    const handleChangeNomFiltre = (ev) => {
        setFilter({ ...filter, label: ev.target.value });
    };

    const deleteFilter = (ev) => {
        setJsonData({ ...jsonData, filters: [...jsonData.filters.filter(f => f.label !== ev.target.name)] });
    };

    const ajouterFiltre = () => {
        let filtreActuel = { label: filter.label, choices: [] };
        const filtreActuel2 = jsonData.filters.filter(f => f.label === filtreActuel.label);
        if (filtreActuel2.length > 0) {
            filtreActuel.choices = [...filtreActuel2[0].choices, { label: choice.label, values: choix }];
        } else {
            filtreActuel.choices = [{ label: choice.label, values: choix }];
        }
        setJsonData({ ...jsonData, filters: [...jsonData.filters.filter(f => f.label !== filtreActuel.label), filtreActuel] });
    };

    //mode edition
    const [rowUuidToEdit, setRowUuidToEdit] = useState('');
    const [uuidsToEdit, setUuidsToEdit] = useState([]);
    const editRow = (e) => {
        setRowUuidToEdit(e.target.name);
        setRowFields({});
        setRow({});
        setShowSave({ [e.target.name]: true });
    };

    const saveEditRow = () => {
        let localRows = jsonData.rows;
        localRows.map((r, id) => {
            let fieldsObj = {};

            if (r.uuid === rowUuidToEdit) {
                jsonData.fields.map((f, idf) => {
                    fieldsObj = { ...fieldsObj, [f]: r.fields[idf] };
                });

                let fieldsToAdd = [...Object.values({ ...fieldsObj, ...rowFields })];
                localRows[id].label = row.label || r.label;
                localRows[id].value = r.value;
                localRows[id].fields = fieldsToAdd;
                localRows[id].uuid = rowUuidToEdit;
            }
        });

        setJsonData({ ...jsonData, rows: [...localRows] });
        setRowFields({});
        setRow({});
        setShowSave({});
        setRowUuidToEdit('');
    };

    const deleteRow = (e) => {
        setJsonData({ ...jsonData, rows: [...jsonData.rows.filter(r => r.uuid !== e.target.name)] });
    };

    const cleanJsonData = () => {
        let cleanedJsonData = JSON.parse(JSON.stringify(jsonData)); //deep copy
        cleanedJsonData.rows.map((r) => {
            delete r.uuid;
        });

        return cleanedJsonData;
    };

    const goToEditMode = () => {
        const json2 = jsonData.rows;
        json2.map((j, id) => {
            setUuidsToEdit(json2.map(j => j.uuid));
        });
    };

    const saveTable = () => {
        uuidsToEdit.map((uuid, id) => {
            
        });
    };

    return (
        <div className="container">
            {console.log(rowFieldsByUuid)}
            <div className="columns">
                <div className="column"></div>
                <div className="column is-one-third">
                    <label>Nouveau Champ: </label>
                    <br /><input className="input" type="text" placeholder="Nom du champ" onChange={handleChangeField} />
                    <button className="button" onClick={addField}>Ajouter</button>
                </div>
            </div>

            <div className="row">
                {jsonData.fields.length <= 0
                    && (
                        <div className="col">
                            <div className="notification is-info" role="alert">
                                Ajoutes un nouveau champ ou colle ton JSON ci-dessous pour commencer :)
                            </div>
                        </div>
                    )
                }
                {jsonData.fields.length > 0
                    && (
                        <div className="col">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Actions</th>
                                        <th />
                                        <th>UUID</th>
                                        {jsonData.fields.map((field, idx) => (
                                            <th key={idx} className="mcf-bg--gris-lune mcf-p--4 mcf-text--center mcf-align--middle mcf-font-weight--normal">{field}</th>
                                        ))}
                                        <th className="mcf-bg--gris-lune mcf-p--4 mcf-text--center mcf-align--middle mcf-font-weight--normal"><strong>Valeur</strong></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jsonData.rows.map(({ uuid, label, value, fields = [] }, idx) => (
                                        <tr key={idx} className="mcf-bg--gris-lune">
                                            <td>
                                                <div hidden={showSave[uuid]}>
                                                    <button name={uuid} className="button is-primary" onClick={editRow}>Modifier</button>
                                                </div>
                                                <div hidden={!showSave[uuid]}>
                                                    <button name={uuid} className="button is-info" onClick={saveEditRow}>Enregistrer</button>
                                                </div>
                                                <button name={uuid} className="button is-danger" onClick={deleteRow}>Supprimer</button>
                                            </td>
                                            <td>
                                                {(uuid !== rowUuidToEdit && !uuidsToEdit.includes(uuid)) && <div dangerouslySetInnerHTML={{ __html: label }}></div>}
                                                {(uuid === rowUuidToEdit || uuidsToEdit.includes(uuid)) && <input type="text" className="input" defaultValue={label} onChange={handleChangeRowLabel} />}
                                            </td>
                                            <td>{uuid}</td>
                                            {jsonData.fields.map((fieldName, idxField) => (

                                                <td key={idxField} className="mcf-text--center mcf-align--middle" >
                                                    {(uuid !== rowUuidToEdit && !uuidsToEdit.includes(uuid)) && <div dangerouslySetInnerHTML={{ __html: fields[idxField] }}>
                                                    </div>}
                                                    {(uuid === rowUuidToEdit || uuidsToEdit.includes(uuid)) && <input type="text" className="input" defaultValue={fields[idxField]} name={fieldName} onChange={handleAddFieldToRow} />}
                                                </td>
                                            ))}
                                            <td className="mcf-text--center mcf-align--middle">{value}</td>
                                        </tr>

                                    ))}
                                    <tr className="mcf-bg--gris-lune">
                                        <td />
                                        {jsonData.fields.length > 0
                                            && (
                                                <td>
                                                    <input className="input" type="text" placeholder="Label" onChange={handleChangeRowLabel} />
                                                </td>
                                            )}
                                        <td />
                                        {jsonData.fields.map((fld, idxField) => (
                                            <td key={idxField}>
                                                <input className="input" type="text" placeholder={fld} name={fld} onChange={handleAddFieldToRow} />
                                            </td>
                                        ))}
                                        <td>
                                            <input className="input" type="text" placeholder="valeur du filtre" name="value" onChange={handleChangeRowValue} />
                                        </td>
                                        <td className="mcf-bg--white" />
                                        <td className="mcf-bg--white">
                                            {jsonData.fields.length > 0 && <button className="button" onClick={addRow}>Ajouter</button>}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="button is-info" onClick={goToEditMode}>Mode Edition</button>
                            <button className="button is-warning" onClick={saveTable}>Sauvegarder</button>
                        </div>
                    )}
            </div>
            <button className="button" onClick={() => setHideFilters(!hideFilters)}>Filtres</button>
            <div hidden={hideFilters}>
                <div>
                    {jsonData.filters.map((f, id) => (
                        <span key={id} className="tag is-danger is-large">
                            {f.label}
                            <button className="delete" name={f.label} onClick={deleteFilter}> </button>
                        </span>
                    ))}
                </div>
                <label>Nouveau Filtre: </label><br />
                <input className="input" type="text" placeholder="nom filtre" onChange={handleChangeNomFiltre} />
                <input className="input" type="text" placeholder="nom choix" onChange={handleLabelChoix} />
                {jsonData.rows.map((r, id) => (
                    <div key={id}>
                        <input type="checkbox" className="checkbox" value={r.value} name={r.value} onChange={handleCheck} />
                        <label htmlFor={r.label}>{r.label}</label>
                    </div>
                ))}
                <button className="button" onClick={ajouterFiltre}>Ajouter</button>
            </div>
            <div className="row">
                <div className="col">
                    <textarea
                        className="textarea"
                        onBlur={handleChangeJson}
                        rows="5"
                        placeholder="Colle ton JSON ici , on te génére ton tableau !"
                    />

                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <h3>JSON résultat :</h3>
                    <textarea
                        className="textarea"
                        id="resultatJson"
                        rows="10"
                        value={JSON.stringify(cleanJsonData())}
                        readOnly
                    />
                    <div className="mcf-d--flex mcf-justify-content--end">
                        <button className="button" onClick={copyJson}>Copier</button><br />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminComparateurOffres;
