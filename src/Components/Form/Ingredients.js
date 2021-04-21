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
        <div>
        {ingredientList.map((inputField, index ) => {
            return (
            <div className="row recipe-box" key={`${inputField}~${index}`}>
                <div className="col-12 col-md-6">
                <input type="text" className="ingredient" placeholder="Ingredient" id="ingredientName" name="ingredientName" value={inputField.ingredient}
                 onChange={event => handleInputChange(index, event) } /></div>
                 <div className="col-6 col-md-3">
                <input type="number" className="ingredientAmount" id="ingredientAmount" placeholder="Amount" name="ingredientAmount" value={inputField.amount}
                onChange={event => handleInputChange(index, event) } /></div>
                <div className="col-6 col-md-3">
                <input type="text" className="ingredientType" id="ingredientType" placeholder="Type" name="ingredientType" value={inputField.type}
                onChange={event => handleInputChange(index, event) } /></div>
            </div>
            )
        })}
        <div className="row recipe-box">
            <div className="col-4 mb-1">
            <button className="btn btn-red-outline" type="button" onClick={() => handleAddFields()}>Add more</button> 
        </div>
        </div>
      </div>
    )
}
export default AddIngredients;