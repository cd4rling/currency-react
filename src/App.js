import React from 'react';
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
  return (
    <Router>
      <div className="container">
        <h2>Currency React App</h2>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link class="nav-item nav-link active" to="/">Rates<span class="sr-only">(current)</span></Link>
              <Link class="nav-item nav-link" to="/convert/">Convert</Link>
              <Link class="nav-item nav-link" to="/charts/">Charts</Link>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/" exact component={Rates} />
          <Route path="/convert/" component={Convert} />
          <Route path="/charts/" component={Charts} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <footer>
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="copyright-box">
                <p class="copyright"><span><FontAwesomeIcon icon={faFacebook} /><FontAwesomeIcon icon={faInstagram} /><FontAwesomeIcon icon={faTwitter} /></span><span>&copy; 2024 Copyright <strong>D4 Web Development LLC</strong>. All Rights Reserved</span></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Router> 
  );
}

export default App;