import React from 'react';
import Menu from "./components/MenuComponent"
import './App.css';
import './css/bootstrap.css'
import './fontawesome/css/all.min.css'
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/HomeComponent';
import { store } from './store/store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Menu />
        <Container>

          <Route path="/" exact component={Home} />

        </Container>
      </Router>
    </Provider>
  );
}

export default App;
