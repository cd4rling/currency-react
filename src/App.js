import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Rates from './Rates';
import Convert from './Convert';
import Charts from './Charts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">BRAND</Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent" 
              aria-controls="navbarSupportedContent" 
              aria-expanded={!isNavCollapsed ? true : false} 
              aria-label="Toggle navigation"
              onClick={handleNavCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Rates</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/convert/">Convert</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/charts/">Charts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="routerContent">
          <Switch>
            <Route path="/" exact component={Rates} />
            <Route path="/convert/" component={Convert} />
            <Route path="/charts/" component={Charts} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
      <footer>
        <div className="">
          <div className="row">
            <div className="col-sm-12">
              <div className="copyright-box">
                <span className=''>
                  <Link to='https://facebook.com' className='mx-2'><FontAwesomeIcon icon={faFacebook} /></Link>  
                  <Link to='https://instagram.com' className='mx-2'><FontAwesomeIcon icon={faInstagram} /></Link>  
                  <Link to='https://twitter.com' className='mx-2'><FontAwesomeIcon icon={faTwitter} /></Link>  
                </span> 
                <span className=''>
                  &copy; 2024 <strong><a href='https://darlingfullstack.com' target='_blank'>D4 Web Development LLC </a></strong>. All Rights Reserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Router> 
  );
}

export default App;