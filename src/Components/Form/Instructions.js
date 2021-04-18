import React, { useState, useEffect, useLayoutEffect } from 'react';
const AddInstructions = (props) => {
    const [ instructionsList, setInstructionsList ] = useState([{ instruction: ""}]);
    const instructions = props.instructions;
    const handleInputChange = (index, event) => {
        const values = [...instructionsList];
        values[index].instruction = event.target.value;
        setInstructionsList(values);
    }
    const handleAddFields = () => {
        const values = [...instructionsList];
        values.push({ instruction: "" });
        setInstructionsList(values);
        console.log(instructionsList);
    }
    useEffect(() => {
        if (props.onChange) {
            props.onChange(instructionsList)
        }
    })
    useLayoutEffect(() => {
        if (typeof instructions !== 'undefined') {
            setInstructionsList(instructions);
        }
    }, [instructions])
    return (
        <div className="form-row">
        {instructionsList.map((inputField, index ) => {
            return (
            <div className="form-group" key={`${inputField}~${index}`}>
                <input type="text" className="instructions" id="instrutionsPhase" name="instructions" value={inputField.instruction}
                 onChange={event => handleInputChange(index, event) } />
            </div>
            )
        })} 
        <button className="btn btn-link" type="button" onClick={() => handleAddFields()}>Add new phase</button> 
      </div>
    )
}
export default AddInstructions;