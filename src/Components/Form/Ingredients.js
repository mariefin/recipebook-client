import React, { useState, useEffect } from 'react';
const AddIngredients = (props) => {
    const [ ingredientList, setIngredientList ] = useState([{ ingredient: "", amount: "", type: ""}]);
    const handleInputChange = (index, event) => {
        const values = [...ingredientList];
        if (event.target.name === "ingredientName") {
            values[index].ingredient = event.target.value;
        } else if (event.target.name === "ingredientAmount") {
            values[index].amount = event.target.value;
        } else {
            values[index].type = event.target.value;
        }
        setIngredientList(values);
    }
    const handleAddFields = () => {
        const values = [...ingredientList];
        values.push({ ingredient: "", amount: "", type: ""});
        setIngredientList(values);
    }
    useEffect(() => {
        if (props.onChange) {
            props.onChange(ingredientList)
        }
    })
    return (
        <div className="form-row">
        {ingredientList.map((inputField, index ) => {
            return (
            <div className="form-group" key={`${inputField}~${index}`}>
                <input type="text" className="ingredient" id="ingredientName" name="ingredientName" value={ingredientList.ingredient} 
                 onChange={event => handleInputChange(index, event) } />
                <input type="number" className="ingredientAmount" id="ingredientAmount" name="ingredientAmount" value={ingredientList.amount}
                onChange={event => handleInputChange(index, event) } />
                <input type="text" className="ingredientType" id="ingredientType" name="ingredientType" value={ingredientList.type}
                onChange={event => handleInputChange(index, event) } />
                <button className="btn btn-link" type="button" onClick={() => handleAddFields()}>Add more</button>
            </div>
            )
        })}  
      </div>
    )
}
export default AddIngredients;