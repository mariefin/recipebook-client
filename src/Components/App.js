import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Home from './Home';
import Add from './Add';
import Recipe from './RecipePage';

const App = () => {
  return(
    <BrowserRouter basename='/reseptikirja/'>
      <React.Fragment>
        <Header pageTitle="Reseptit"/>
        <Switch>
          <Route exact path = '/' component = { Home } />
          <Route exact path = '/addrecipe' component = { Add } />
          <Route exact path ='/:recipeId' component = { Recipe } />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}

export default App;