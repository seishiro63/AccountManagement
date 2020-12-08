import logo from './logo.svg';
import './App.css';


import React from 'react';
import {Switch, Route} from 'react-router-dom';

import ConnexionForm from './components/ConnexionForm';
import NavBarForm from './components/NavBar';

import HomeForm from './components/HomeForm';
import AddActionForm from './components/ActionList/AddActionForm';
import AddActionList from './components/ActionList/AddActionList';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list:[
        {date:"01/12/2020", label:"list", amount:"85.26"},
        {date:"05/12/2020", label:"petrol", amount:"59.43"},
        {date:"08/12/2020", label:"chocolat", amount:"43.52"},
        {date:"10/12/2020", label:"Xmas present", amount:"156.53"},
      ],
      lastactions:[
        {date:"01/12/2020", label:"KMarcket", amount:"85.26"},
        {date:"05/12/2020", label:"petrol", amount:"59.43"},
        {date:"08/12/2020", label:"chocolat", amount:"43.52"},
        {date:"10/12/2020", label:"Xmas present", amount:"156.53"},
      ],

      history:[
        {date:"01/01/2018", label:"Colis EcoParcel", amount:90.20},
        {date:"20/04/2018", label:"Posti", amount:11.80},
        {date:"01/12/2018", label:"Plein", amount:37.03},
        {date:"01/06/2019", label:"XXL", amount:29.80}
      ]
    };
  }

  render() {

    return (
      <div className="App">
        <div className="header">
          <ConnexionForm/>
          <NavBarForm/>
        </div>

        <div id="corps">
        <Switch>
          <Route exact path="/" render={ () => (<HomeForm/>)} />
          <Route exact path="/lastaction" render={ () => (<HomeForm/>)} />
          <Route exact path="/addaction" render={ () => (<AddActionForm list={this.state.list}/>)} />
          <Route exact path="/lastactions" render={ () => (<AddActionList list={this.state.lastactions}/>)} />
          <Route exact path="/history" render={ () => (<AddActionList list={this.state.history}  />)} />
        </Switch>
        </div>
      </div>      
    );
  }
}

export default App;
