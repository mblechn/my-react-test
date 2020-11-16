import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import NavBar from './components/navBar';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import Docs from './components/docs';
import auth from "./services/authService";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    console.log(user);
    //if (!user) window.location = "/login";
  }

  render() { 
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container mt-4">
          <Switch>      
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/docs" component={Docs}></Route>
            <Redirect from="/" exact to="/docs" />
            <Redirect to="/docs" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;
