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
        <div className="row recipe-box">
        {instructionsList.map((inputField, index ) => {
            return (
            <div className="col-12" key={`${inputField}~${index}`}>
                <input type="text" className="instructions" placeholder={`Phase ${index+1}`} id="instrutionsPhase" name="instructions" value={inputField.instruction}
                 onChange={event => handleInputChange(index, event) } />
            </div>
            )
        })} 
        <div className="col-6 mb-2">
            <button className="btn btn-red-outline" type="button" onClick={() => handleAddFields()}>Add new phase</button> 
        </div>
      </div>
    )
}
export default AddInstructions;