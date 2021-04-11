import React from 'react';

const RecipePage = (props) => {
    return (
      <div className="row">
          <div className="col-12 text-center">
            <h2>{props.recipeName}</h2>
            <div class="recipeNavigation">
              <input type="radio" name="tabs" id="aineet" checked></input>
              <label for="aineet">Ainesosat</label>
              <input type="radio" name="tabs" id="ohjeet" checked></input>
              <label for="ohjeet">Ohjeet</label>
              
            <div class="tab aineet text-left">
              {props.aineet}
              test asdkalösdkölsakdla
            </div>
            <div class="tab ohjeet text-left">
              {props.ohjeet}
              tklaskdölaskd asköldkaösdkaösldkas 
            </div>
            </div>
          </div>
      </div>
    )
  }

  export default RecipePage;