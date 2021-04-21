import React from 'react';
import { Link } from 'react-router-dom';
import herokuva from '../etusivu.jpg';

const Header = ({pageTitle}) => {
    return (
      <header>
      <nav className="navigation">
        <ul className="mb-0">
          <li><Link to ='/'>Recipes</Link></li>
          <li><Link to ='/addrecipe'>Add Recipe</Link></li>
        </ul>
      </nav>
      <div className="hero" style={{ backgroundImage:`url(${herokuva})` }}>
        <h1> 
          {pageTitle} 
        </h1>
      </div>
      </header>
    )
  }

export default Header;