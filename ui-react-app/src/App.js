import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Contents from './components/Contents';

class App extends Component {
  render() {
    return (
    <Router>
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a href="#/" className="navbar-brand col-sm-3 col-md-2 mr-0">Name</a>
          <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a href="#/" className="nav-link">Sign out</a>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/"><i className="fa fa-dashboard"></i> Elements</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <Route exact path="/" component={Home} />
              <Route path="/contents/:id" component={Contents} />
            </main>
          </div>
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
