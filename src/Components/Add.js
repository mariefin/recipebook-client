import axios from 'axios';
import React, { Component } from 'react';
import '../index.css';
import AddIngredients from './Form/Ingredients';
const apiUrl = `http://localhost:8080`;
let ingredients;

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMe: false,
      src: '',
      title: '',
      postData: false
    }
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
    /*setTimeout(() => { 
        let url = `http://${window.location.hostname}:${window.location.port}/reseptikirja`
        window.location.href = url;
      }, 1500);*/
    
  }
  eventhandler = data => ingredients = data

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
      console.log(this.state.src);
      this.setState({ postData: true});
    } else {
      let { postData } = this.state;
      if (postData) return;
      else {
        this.setState({src: "https://via.placeholder.com/400x300"});
        this.setState({postData: true});
      }
    }
  }

  async createRecipe(recipeData) {
    const config = {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: recipeData
    }
    await axios.post(apiUrl + '/recipe-create', config)
  }

  async sendData(){
    let { postData } = this.state;

    if (postData) {
      const reci = {
        name: document.getElementById('recipeName').value,
        image: this.state.src,
        instructions: document.getElementById('recipeInstructions').value,
        ingredients: ingredients
      };
      console.log(reci);
      document.getElementById('recipeName').value = '';
      this.setState({ src: ''});
      document.getElementById('recipeInstructions').value = '';
      // document.getElementById('recipeIngredients').value = '';

      this.createRecipe(reci);
    }
  }

  render() {
    
    const { showMe } = this.state;
    return (
      <div className="container">
      <div className="main"> 
        <h3>LISÄÄ RESEPTI</h3>
        <form>
          <input id="recipeName" type="text" placeholder = "Name" name="Name" />
          <input id="recipeImage" type="file" placeholder="Upload image" name="Image"/>
          <AddIngredients onChange={this.eventhandler} />
          <textarea id="recipeInstructions" placeholder="Instructions" name="Instructions"></textarea>
          <input id="recipeSave" value="Save" type="button" onClick={this.showMsgSend} onMouseEnter={this.getData}/>
        </form>
        {
          showMe ?
            <div id="viesti">
                <h3>Recipe added succesfully!</h3>
              </div>
              :null
        }

      </div>
      </div>
    )
  }
}
