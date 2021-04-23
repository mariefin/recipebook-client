import React, { Component} from 'react';
import axios from 'axios';
import '../index.css';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// const apiUrl = `http://localhost:8080`;
const apiUrl = `http://recipeserver:8080`
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
      return <button className="btn btn-danger delete" onClick={this.deleteUser}>Delete</button>
  }
}
const RecipePage = (props) => {
  let recipe = JSON.parse(props.location.singleRecipe);
  const ingredients = recipe.ingredients;
  const instructions = recipe.instructions;
    return (
      <Container>
          <Row className="mb-4">
            <Col xs={12} className="text-center">
            <h2>{recipe.name}</h2>
            </Col>
            </Row>
            <Row className="recipe-box mb-4">
              <Col xs={12} md={4} className="p-0 recipe-page-image">                
                  <img src={recipe.image} alt= {recipe.name} className="img-fluid"/>
              </Col>
              <Col xs={12} md={8} className="recipe-text">
                <h3>Ingredients</h3>
              {ingredients.map((ingredient, index) => {
                        return <p key={index} className="mb-2 pt-2 pb-2">{ingredient.ingredient} <strong>{ingredient.amount}{ingredient.type}</strong></p>
                      })}
              </Col>
            </Row>
            <Row className="recipe-box mb-2">
              <Col xs={12} className="pb-3 recipe-text">
                <h3>Instructions</h3>
                  {instructions.map((phase, index) => {
                      return <p key={index} className="mb-2 pt-2 pb-2"><strong>{index+1}.</strong> {phase.instruction}</p>
                    })}
                </Col>
              </Row>
              <Row className="mb-5">
                <Col xs={6}>
                  <Link className="btn btn-red-outline" to={{pathname: `/update/${recipe._id}`, singleRecipe: `${JSON.stringify(recipe)}`}}>Update</Link>
                </Col>
                <Col xs={6}>
                  <Delete id={recipe._id}></Delete>
                </Col>
          </Row>
      </Container>
    )
  }

  export default RecipePage;