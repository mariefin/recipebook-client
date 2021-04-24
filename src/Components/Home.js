import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';

const apiUrl = `http://${window.location.hostname}:8080`;


class Home extends Component {
    constructor(){
        super();
        this.state = {
            reseptit: []
        }
        this.getAllRecipes = this.getAllRecipes.bind(this);
    }

    async getAllRecipes() {
        const result = await axios.get(apiUrl + '/recipes');
        this.setState( {
            reseptit:result.data
        }, () => console.log("Reseptit haettu"))
    }

    componentDidMount() {
        this.getAllRecipes();
    }

    render() {
        const { reseptit } = this.state;
        return (
            <div className="container">
                <div className="main">
                    <h2>Recipes</h2>
                    {
                        reseptit.map(
                            recipe => 
                            <div className="row recipe-box mb-4" key={recipe._id}>
                            <div className="col-sm-6 col-12 recipe-text">
                              <h2><Link to={{pathname: `/${recipe._id}`, singleRecipe: `${JSON.stringify(recipe)}`}}>{recipe.name}</Link></h2>
                              <p>{recipe.ingress}</p>
                              <p>
                                  <Link key = {recipe._id} to={{pathname: `/${recipe._id}`, singleRecipe: `${JSON.stringify(recipe)}`}}>
                                      <span onClick= {this.getRecipe}>Read the recipe</span>
                                  </Link>
                              </p>
                            </div>
                            <div className="col-sm-6 col-12 p-0">
                              <img src={recipe.image} className="img-fluid recipe-image" alt={recipe.name} />
                            </div>
                          </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Home;