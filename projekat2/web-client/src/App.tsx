import React from 'react';
import Menu from "./components/MenuComponent"
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import './fontawesome/css/all.min.css'
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/HomeComponent';
import Stats from './components/StatsComponent';

const App: React.FC = () => {
  return (
    <Router>
      <Menu />
      <Container>

        <Route path="/" exact component={Home} />
        <Route path="/stats" component={Stats} />

      </Container>
    </Router>
  );
}

export default App;
