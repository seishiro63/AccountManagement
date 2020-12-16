import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

/**
 * Redux:
 * an action is called, the reducer check what action you did.
 * Based on the action, the reducer will modify the store.
 */
//STORE : globolize state
//store all data / state needed for the applicaiton
import {createStore,applyMiddleware,combineReducers} from 'redux';

//ACTION

//REDUCER : describe how the actions transform the states into the next state.
import loginReducer from './reducers/loginReducer';
import {Provider} from 'react-redux';

//DISPATCH : dispatch (execute) an action to the reducer



import thunk from 'redux-thunk';

//Concat of all reducers:
const rootReducer = combineReducers({
  login:loginReducer  
})

//Creataion of the store : 
const store = createStore(rootReducer, 
              applyMiddleware(thunk)
);

ReactDOM.render(
  <React.StrictMode>
	  <Provider store={store}>
		  <BrowserRouter>
			<App />
		  </BrowserRouter>
	  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
