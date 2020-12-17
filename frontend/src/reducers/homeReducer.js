import {
    FETCH_HOME_LIST_SUCCESS,
    FETCH_HOME_LIST_FAILED,
    CLEAR_HOME_LIST_STATE
} from '../actions/homeActions';

import {
    LOADING,
	LOADING_DONE
} from '../actions/loginActions';

/* home state
	list: []
*/
const getInitialState = () => {
	if(sessionStorage.getItem("homestate")) {
		let state = JSON.parse(sessionStorage.getItem("homestate"));
		return state;
	} else {
		return {
            list:[],
            loading:false,
			error:""
		}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("homestate",JSON.stringify(state));
}

const initialState = getInitialState();

const loginReducer = (state = initialState, action) => {
	console.log("HomeReducer:",action);
	let tempState = {};
	switch(action.type) {
        case LOADING:
			return {
				...state,
				loading:true,
				error:""
            }
            
		case LOADING_DONE:
			return {
				...state,
				loading:false,
				error:""
            }

		case FETCH_HOME_LIST_SUCCESS:
            tempState = {
                list:action.list,
                loading:false,
				error:""
			}
			saveToStorage(tempState);
            return tempState;
            
		case FETCH_HOME_LIST_FAILED:
			tempState = {
                ...state,
                loading:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
            
		case CLEAR_HOME_LIST_STATE:
			tempState = {
                list:[],
                loading:false,
				error:""
			}
			saveToStorage(tempState);
            return tempState;
            
		default:
			return state;
	}
}

export default loginReducer;