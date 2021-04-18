import React, { useState, useEffect, useLayoutEffect } from 'react';
const AddIngredients = (props) => {
    const [ ingredientList, setIngredientList ] = useState([{ ingredient: "", amount: "", type: ""}]);
    const ingredients = props.ingredients;
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
    useLayoutEffect(() => {
        if (typeof ingredients !== 'undefined') {
            setIngredientList(ingredients);
        }
    }, [ingredients])
    return (
        <div className="form-row">
        {ingredientList.map((inputField, index ) => {
            return (
            <div className="form-group" key={`${inputField}~${index}`}>
                <input type="text" className="ingredient" id="ingredientName" name="ingredientName" value={inputField.ingredient}
                 onChange={event => handleInputChange(index, event) } />
                <input type="number" className="ingredientAmount" id="ingredientAmount" name="ingredientAmount" value={inputField.amount}
                onChange={event => handleInputChange(index, event) } />
                <input type="text" className="ingredientType" id="ingredientType" name="ingredientType" value={inputField.type}
                onChange={event => handleInputChange(index, event) } />
            </div>
            )
        })} 
        <button className="btn btn-link" type="button" onClick={() => handleAddFields()}>Add more</button> 
      </div>
    )
}
export default AddIngredients;