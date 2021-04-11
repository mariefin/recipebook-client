import React from 'react';
import herokuva from '../etusivu.jpg';

const Header = ({pageTitle}) => {
    return (
      <header>
      <nav className="navigation">
        <ul>
          <li><a href="#">Reseptit</a></li>
          <li><a href="#">Lisää resepti</a></li>
          <li><a href="#">Hakue</a></li>
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