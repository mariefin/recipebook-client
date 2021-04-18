import React, { Component} from 'react';
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import axios from 'axios';
import '../index.css';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router-dom';

const apiUrl = `http://localhost:8080`;
const config = {
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
}
const deleteById = id => axios.delete(apiUrl + "/delete-recipe/" + id, config)
class Delete extends Component {
  deleteUser = event => {
      event.preventDefault()
      deleteById(this.props.id)  
      setTimeout(() => { 
        let url = `http://${window.location.hostname}:${window.location.port}/recipebook`
        window.location.href = url;
      }, 1500);  
  }

  render() {
      return <button className="btn delete" onClick={this.deleteUser}>Delete</button>
  }
}
const RecipePage = (props) => {
  let recipe = JSON.parse(props.location.singleRecipe);
  const ingredients = recipe.ingredients;
  const instructions = recipe.instructions;
    return (
      <div className="container">
        <div className="main">
          <div className="row">
            <div className="col-12 text-center">
            <div className="my-5">
                <h2>{recipe.name}</h2>
                <img src={recipe.image} alt= {recipe.name} className = "max500 img-fluid"/>
            </div>
            <div className="my-5">
              <Tabs>
                <TabList>
                  <Tab>Ainesosat</Tab>
                  <Tab>Ohjeet</Tab>
                </TabList>
                <TabPanel>
                    {ingredients.map((ingredient, index) => {
                      return <p key={index}>{ingredient.ingredient} {ingredient.amount} {ingredient.type}</p>
                    })}
                </TabPanel>
                <TabPanel>
                  {instructions.map((phase, index) => {
                      return <p key={index}>{phase.instruction}</p>
                    })}
                </TabPanel>
              </Tabs>
              </div>
              <Delete id={recipe._id}></Delete>
              <Link to={{pathname: `/update/${recipe._id}`, singleRecipe: `${JSON.stringify(recipe)}`}}>Update</Link>
            </div>
        </div>
        </div>
      </div>
      
    )
  }

  export default RecipePage;