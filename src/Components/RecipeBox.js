import React from 'react';
import herokuva from '../etusivu.jpg';

const RecipeBox = ({recipeName}) => {
    return (
      <div className="row">
        <div className="col-sm-6 col-12">
          <h2>{recipeName}</h2>
          <p>testi stlaöt kadlaksjda ls askld jalksjd lkasjdlka jdlkamckanclka jclksa lkasjdlajsdlkasjdlkajslkdajs divakjds
            asjdlkasjdlkajs djsa dlkajslkdjsalkdaskld jalskcjaslkc ajslkjc alkjsalkjashdlkasjdasdalksd asjdlkasjdlkajsalksjdl
            kaljsdlkjasld ajslkda jslkdjsa ldkajslkdjsalkd jaslkdjalkdsja lksjdlkajdlksa jdklsajdlkajaslkdjals
          </p>
          <p><a className="btn" href="https://www.oulu.fi">Linkki reseptiin</a></p>
        </div>
        <div className="col-sm-6 col-12">
          <img src={herokuva} className="img-fluid" alt="herokuva" />
        </div>
      </div>
    )
  }
  
  export default RecipeBox;