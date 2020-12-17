//import logo from './logo.svg';
import './App.css';


import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import ConnexionHeaderForm from './components/ConnexionHeaderForm';
import NavBarForm from './components/NavBar';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomeForm from './components/HomeForm';
//import AddActionForm from './components/ActionList/AddActionForm';
//import AddActionList from './components/ActionList/AddActionList';

import {connect} from 'react-redux';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list:[], //The list to display.
      isLogged:false,
      token:"", //store the tocken form authentification.
      login:"",
    };
  }

  /***************************************************************
   * RENDER
   **************************************************************/ 
  render() {
    return (
      <div className="App">
        <div className="header">
          <ConnexionHeaderForm />
          <NavBarForm/>
        </div>

        <div id="corps">
          <Switch>
            <Route exact path="/" render={() => this.props.isLogged ?
              (<Redirect to="/home"/>) :
              (<LoginForm/>)
            }/>
            <Route path="/register" render={() => this.props.isLogged ?
              (<Redirect to="/"/>) :
              (<RegisterForm />)
            }/>
            <Route path="/home" render={ () => this.props.isLogged ?
              (<HomeForm />) :
              (<Redirect to="/" />)
            } />
          </Switch>
        </div>
      </div>      
    );

  }
}

const mapStateToProps = (state) => {
	return {
		token:state.login.token,
		isLogged:state.login.isLogged
	}
}

export default connect(mapStateToProps)(App);

/*

          <Route exact path="/" render={ () => (<HomeForm/>)} />
          <Route exact path="/lastaction" render={ () => (<HomeForm/>)} />
          <Route exact path="/addaction" render={ () => (<AddActionForm list={this.state.list}/>)} />
          <Route exact path="/lastactions" render={ () => (<AddActionList list={this.state.lastactions}/>)} />
          <Route exact path="/history" render={ () => (<AddActionList list={this.state.history}  />)} />

*/