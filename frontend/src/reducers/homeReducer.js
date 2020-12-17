import {
    FETCH_HOME_LIST_SUCCESS,
    FETCH_HOME_LIST_FAILED,
    CLEAR_HOME_LIST_STATE
} from '../actions/homeActions';


const getInitialState = () => {
	if(sessionStorage.getItem("loginstate")) {
		let state = JSON.parse(sessionStorage.getItem("loginstate"));
		return state;
	} else {
		return {
			list:[],
			error:""
		}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const initialState = getInitialState();

const loginReducer = (state = initialState, action) => {
	console.log("LoginReducer:",action);
	let tempState = {};
	switch(action.type) {
		case FETCH_HOME_LIST_SUCCESS:
            tempState = {
				list:action.list,
				error:""
			}
			saveToStorage(tempState);
            return tempState;
            
		case FETCH_HOME_LIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
            
		case CLEAR_HOME_LIST_STATE:
			tempState = {
				list:[],
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

export default loginReducer;