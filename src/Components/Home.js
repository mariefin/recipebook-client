import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';
const apiUrl = `http://localhost:8080`;

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
                    <h2>Reseptit</h2>
                    {
                        reseptit.map(
                            recipe => 
                            <div className="row" key={recipe._id}>
                            <div className="col-sm-6 col-12">
                              <h2><Link to={{pathname: `/${recipe._id}`, singleRecipe: `${JSON.stringify(recipe)}`}}>{recipe.name}</Link></h2>
                              <p>
                                  <Link key = {recipe._id} to={{pathname: `/${recipe._id}`, singleRecipe: `${JSON.stringify(recipe)}`}}>
                                      <span onClick= {this.getRecipe}>Read the recipe</span>
                                  </Link>
                              </p>
                            </div>
                            <div className="col-sm-6 col-12">
                              <img src={recipe.image} className="img-fluid" alt={recipe.name} />
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