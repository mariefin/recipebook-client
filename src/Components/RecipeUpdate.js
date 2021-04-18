import React, { Component} from 'react';
import axios from 'axios';
import '../index.css';
import AddIngredients from './Form/Ingredients';
import AddInstructions from './Form/Instructions';


const apiUrl = `http://localhost:8080`;
let ingredients;
let instructions;

export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMe: false,
      src: '',
      title: '',
      postData: false
    }
    
    this.recipe = JSON.parse(props.location.singleRecipe);
    this.showMsg = this.showMsg.bind(this);
    this.showMsgSend = this.showMsgSend.bind(this);
    this.sendData = this.sendData.bind(this);
    this.getData = this.getData.bind(this);
  }

  showMsg(){
    this.setState({
      showMe: true
    });
    setTimeout(()=> {
      this.setState({
        showMe: false
      });
    }, 1200);
  }

  showMsgSend() {
    this.showMsg();
    setTimeout(() => { this.sendData();}, 1000);
    setTimeout(() => { 
        let url = `http://${window.location.hostname}:${window.location.port}/recipebook`
        window.location.href = url;
      }, 1500); 
  }
  handleIngredients = data => ingredients = data
  handleInstructions = data => instructions = data

  getData(files) {
    let file = document.getElementById('recipeImage').files[0];
    if(file) {
      let reader = new FileReader();
      reader.onload = ((image) => {
        return (e) => {
          this.setState({src: e.target.result});
        };
      })(file);
      reader.readAsDataURL(file);
      this.setState({ postData: true});
    } else {
      let { postData } = this.state;
      if (postData) return;
      else {
        this.setState({src: this.recipe.image });
        this.setState({postData: true});
      }
    }
  }

  async updateRecipe(recipeData) {
    const config = {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: recipeData
    }
    await axios.post(apiUrl + '/update-recipe/' + this.recipe._id, config)
  }

  async sendData(){
    let { postData } = this.state;

    if (postData) {
      const reci = {
        name: document.getElementById('recipeName').value,
        image: this.state.src,
        instructions: instructions,
        ingredients: ingredients,
        ingress: document.getElementById('recipeIngress').value,
        id: this.recipe._id
      };
      document.getElementById('recipeName').value = '';
      this.setState({ src: ''});
      this.updateRecipe(reci);
    }
  }

  render() {
    const { showMe } = this.state;
    return (
      <div className="container">
      <div className="main"> 
        <h3>Update Recipe - { this.recipe.name }</h3>
        <form>
          <input id="recipeName" type="text" placeholder = "Name" name="Name" defaultValue={ this.recipe.name }/>
          <input id="recipeIngress" type="text" placeholder="Ingress" name="Ingress" defaultValue={ this.recipe.ingress} />
          <input id="recipeImage" type="file" placeholder="Upload image" name="Image"/>
          <AddIngredients onChange={this.handleIngredients} ingredients={this.recipe.ingredients}/>
          <AddInstructions onChange={this.handleInstructions} instructions={this.recipe.instructions}/>
          <input id="recipeSave" value="Save" type="button" onClick={this.showMsgSend} onMouseEnter={this.getData}/>
        </form>
        {
          showMe ?
            <div id="viesti">
                <h3>Recipe updated succesfully!</h3>
              </div>
              :null
        }

      </div>
      </div>
    )
  }
}