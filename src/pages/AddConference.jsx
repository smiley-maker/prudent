import React, { useState } from 'react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { db } from '../firestore';
import { conferenceInputs } from '../conference-inputs';
import { collection, addDoc } from 'firebase/firestore';

function AddConference() {
    const [formFields, setFormFields] = useState({});
    const [relevantDateInputs, setRelevantDateInputs] = useState([
        {
            relevantDateDescription: '',
            relevantDate: new Date().toISOString().split('T')[0],
        },
    ]);

    const handleDataInput = (e) => {
        const { id, value } = e.target;
        setFormFields((prevFields) => ({
            ...prevFields,
            [id]: value,
        }));
    };

    const handleFormChange = (index, field, value) => {
        const updatedInputs = [...relevantDateInputs];
        updatedInputs[index] = {
            ...updatedInputs[index],
            [field]: value,
        };
        setRelevantDateInputs(updatedInputs);
    };

    const addFields = () => {
        setRelevantDateInputs((prevInputs) => [
            ...prevInputs,
            {
                relevantDateDescription: '',
                relevantDate: new Date().toISOString().split('T')[0],
            },
        ]);
    };

    const removeFields = (index) => {
        const updatedInputs = [...relevantDateInputs];
        updatedInputs.splice(index, 1);
        setRelevantDateInputs(updatedInputs);
    };

    const formatDataForFirestore = (relevantDateInputs, formFields) => {
        const formattedData = { ...formFields };

        const formattedRelevantDates = relevantDateInputs.reduce((acc, input) => {
            const { relevantDateDescription, relevantDate } = input;
            if (relevantDateDescription.trim() !== '') {
                return { ...acc, [relevantDateDescription]: relevantDate };
            }
            return acc;
        }, {});

        formattedData.relevantDates = formattedRelevantDates;

        return formattedData;
    };

    const submit = async (e) => {
        e.preventDefault();
        console.log(relevantDateInputs);
        const formattedData = formatDataForFirestore(relevantDateInputs, formFields);
        console.log(formattedData);

        const confRef = collection(db, 'conferences');
        await addDoc(confRef, formattedData);

        // Reset form data
        setFormFields({});
        setRelevantDateInputs([
            {
                relevantDateDescription: '',
                relevantDate: new Date().toISOString().split('T')[0],
            },
        ]);
    };

    return (
        <div className="add-conference">
            <h3>Is there a conference missing?</h3>
            <h1>Add it here!</h1>
            <form onSubmit={submit} className="login-form">
                {conferenceInputs.map((confInput) => (
                    <div key={confInput.id} className="input-wrapper">
                        <label htmlFor={confInput.id} className="input-label">
                            {confInput.text}
                        </label>
                        <input
                            id={confInput.id}
                            type={confInput.type}
                            className="login-input"
                            onChange={handleDataInput}
                            key={confInput.id}
                        />
                    </div>
                ))}
                <p className="par">
                    If the conference lists any important or relevant dates, please put
                    them below. Some examples might include submission deadlines, rewrite
                    dates, or when decisions are made.
                </p>
                {relevantDateInputs.map((input, index) => (
                    <div key={`relevantDate-${index}`} className="relatedDates">
                        <input
                            type="text"
                            name="relevantDateDescription"
                            value={input.relevantDateDescription}
                            className="login-input"
                            placeholder="Description of the conference date."
                            onChange={(event) =>
                                handleFormChange(index, 'relevantDateDescription', event.target.value)
                            }
                        />
                        <input
                            type="date"
                            name="relevantDate"
                            value={input.relevantDate}
                            className="login-input"
                            placeholder="Date"
                            onChange={(event) =>
                                handleFormChange(index, 'relevantDate', event.target.value)
                            }
                        />
                        <button onClick={() => removeFields(index)} className="remove-btn">
                            <HighlightOffOutlinedIcon />
                        </button>
                    </div>
                ))}

                <input
                    className="login-button"
                    type="button"
                    value="Add another date..."
                    onClick={addFields}
                />

                <button className="login-button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddConference;
