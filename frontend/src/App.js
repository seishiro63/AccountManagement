import logo from './logo.svg';
import './App.css';


import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import ConnexionHeaderForm from './components/ConnexionHeaderForm';
import NavBarForm from './components/NavBar';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomeForm from './components/HomeForm';
import AddActionForm from './components/ActionList/AddActionForm';
import AddActionList from './components/ActionList/AddActionList';

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
   * AUTH PART
   **************************************************************/
  register = (user) => {
    let request = {
      method:"POST",
      mode:"cors",
      headers:{"Content-type":"application/json"},
      body: JSON.stringify(user)
    }
    fetch("/register", request).then(response => {
      if(response.ok) {
        //alert("register success");
      }
      else {
        console.log("Server responded with a status : ", response.status);
      }
    }) 
    .catch(error => {
      console.log("Server responded with an error. Reason : ", error);
    })
  }

  login = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("/login",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
            isLogged:true,
            token:data.token,
            login: user.login, //storing login for display.
					},() => {
            //call the list
            this.getList();
						this.saveToStorage();
					})
				}).catch(error => {
					console.log("Failed to parse JSON. Error:",error);
				})
			} else {
				console.log("Server responded with a status:",response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});
	}

  logout = () => {
    let request = {
      method:"POST",
      mode:"cors",
      headers:{"Content-type":"application/json",
                token:this.state.token}
     }
     fetch("/logout", request).then( response => {
       if (response.ok) {
         this.clearState();
       }
       else{
         console.log("Server respond with status: " + response.status);
        this.setState({
          list:[],
          isLogged:false,
          token:""
        })
       }
     }).catch();
  }

  /**
   * Get all the accout for a user
   */
  getList = (path) => {
  let request = {
      method:"GET",
      mode:"cors",
      headers:{"Content-type":"application/json",
              token:this.state.token}
    }
    console.log("Request getlist sent to server on path " + path);
    //console.log(request);
    fetch(path, request).then(response => {
      if(response.ok) { //status 200
        response.json().then(data => {
          this.setState({
            list:data
          }, () => {
                    this.saveToStorage();
                  }
          )
        }).catch(error => {
          console.log("Parsing of JSON failed. Reason: ", error);
        });
      } else {
        if (response.status === 403) {
          this.clearState();
          console.log("Session expired. Logging you out.");
        }
        console.log("Server resond with a status: " + response.status);
      }
    }).catch(error => { //handeling error 400+
      console.log("Server respond whith an error. Reason: " + error);
    });
  }

  /*
   * Prevent loosing the session on refresh.
   */
  componentDidMount() {
    if(sessionStorage.getItem("state")) {
      let state = JSON.parse(sessionStorage.getItem("state"));
      this.setState(state, () => {
        //this.getList();
      })
    }
  }

  /*
   * store the information returned by the server
   */
  saveToStorage = () => {
    sessionStorage.setItem("state", JSON.stringify(this.state))
  }

  // to manage idle session:
  clearState =() => {
    this.setState({
      isLogged:false,
      list:[],
      token:""
    }, () => {
      this.saveToStorage();
    })
  }











  /***************************************************************
   * RENDER
   **************************************************************/ 
  render() {

    return (
      <div className="App">
        <div className="header">
          <ConnexionHeaderForm isLogged={this.state.isLogged}
                               logout={this.logout}
                               login={this.state.login}
                               token={this.state.token}/>
          <NavBarForm/>
        </div>

        <div id="corps">
        <Switch>
          <Route exact path="/" render={() => this.state.isLogged ?
            (<Redirect to="/home"/>) 
            :
            (<LoginForm login={this.login}/>)
          }/>
          <Route path="/register" render={() => this.state.isLogged ?
            (<Redirect to="/"/>)  
            :
            (<RegisterForm login={this.login}
                          register={this.register} />)
          }/>
          <Route path="/home" render={ () => this.state.isLogged ?
            (<HomeForm getList={this.getList}
                       list={this.state.list}/>)
            :
            (<Redirect to="/" />)
          } />
        </Switch>
        </div>
      </div>      
    );
  }
}

export default App;


/*

          <Route exact path="/" render={ () => (<HomeForm/>)} />
          <Route exact path="/lastaction" render={ () => (<HomeForm/>)} />
          <Route exact path="/addaction" render={ () => (<AddActionForm list={this.state.list}/>)} />
          <Route exact path="/lastactions" render={ () => (<AddActionList list={this.state.lastactions}/>)} />
          <Route exact path="/history" render={ () => (<AddActionList list={this.state.history}  />)} />

*/