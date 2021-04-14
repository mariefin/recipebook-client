import React, { Component} from 'react';
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import axios from 'axios';
import '../index.css';
import 'react-tabs/style/react-tabs.css';

const deleteById = id => axios.delete(`http://localhost:5000/api/recipes/${id}`)  
class Delete extends Component {
  deleteUser = event => {
      event.preventDefault()

      if (
          window.confirm(
              `Do tou want to delete the movie ${this.props.id} permanently?`,
          )
      ) {
          deleteById(this.props.id)
          let url = `http://${window.location.hostname}:${window.location.port}/reseptikirja`
          window.location.href = url;
      }
  }

  render() {
      return <button className="btn delete" onClick={this.deleteUser}>Delete</button>
  }
}
const RecipePage = (props) => {
  let recipe = JSON.parse(props.location.singleRecipe);
    return (
      <div className="container">
        <div className="main">
          <div className="row">
            <div className="col-12 text-center">
            <div className="my-5">
                <h2>{recipe.nimi}</h2>
                <img src={recipe.image} alt= {recipe.nimi} className = "max500"/>
            </div>
            <div className="my-5">
              <Tabs>
                <TabList>
                  <Tab>Ainesosat</Tab>
                  <Tab>Ohjeet</Tab>
                </TabList>
                <TabPanel>
                  <p>{recipe.ainesosat}</p>
                </TabPanel>
                <TabPanel>
                  <p>{recipe.ohjeet}</p>
                </TabPanel>
              </Tabs>
              </div>
              <Delete id={recipe._id}></Delete>
            </div>
        </div>
        </div>
      </div>
      
    )
  }

  export default RecipePage;