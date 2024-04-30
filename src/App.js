import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';

const Home = () => {
  return <h2>Home</h2>;
}

const About = () => {
  return <h2>About</h2>;
}

const Contact = () => {
  return <h2>Contact</h2>;
}

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <div className="container">
        <h2>React Rotuer Demo</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Rates</Link>
            </li>
            <li>
              <Link to="/about/">Convert</Link>
            </li>
            <li>
              <Link to="/contact/">Charts</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Rates} />
          <Route path="/about/" component={Convert} />
          <Route path="/contact/" component={Charts} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router> 
  );
}

export default App;