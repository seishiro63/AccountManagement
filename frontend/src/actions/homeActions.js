import {loading,loadingDone,clearLoginState, CLEAR_LOGIN_STATE} from './loginActions';


export const FETCH_HOME_LIST_SUCCESS = "FETCH_HOME_LIST_SUCCESS";
export const FETCH_HOME_LIST_FAILED = "FETCH_HOME_LIST_FAILED";
export const CLEAR_HOME_LIST_STATE = "CLEAR_HOME_LIST_STATE";


/**
 * ASYNC ACTION CREATORS
 */
export const getList = (token,query) => {
	return (dispatch) => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					token:token}
		}
		let url = "/api/shopping";
		if(query) {
			url = url+"?type="+query
		}
		dispatch(loading());
		fetch(url,request).then(response => {
			dispatch(loadingDone());
			if(response.ok) {
				response.json().then(data => {
					dispatch(fetchHomelistSuccess(data));	
				}).catch(error => {
					dispatch(fetchHomelistFailed("Error parsing shopping information"));
				});
			} else {
				if(response.status === 403) {
					dispatch(clearLoginState());
					dispatch(clearHomelistState());
					dispatch(fetchHomelistFailed("Server responded with an expired session. Logging you out!"));
				} else {
					dispatch(fetchHomelistFailed("Server responed with a status:"+response.statusText));	
				}
			}
		}).catch(error => {
			dispatch(loadingDone());
			dispatch(fetchHomelistFailed("Server responded with an error:"+error));
		});
	}
}


/**
 * ACTIONS
 */
export const fetchHomelistSuccess = (list) => {
	return {
		type:FETCH_HOME_LIST_SUCCESS,
		list:list
	}
}

export const fetchHomelistFailed = (error) => {
	return {
		type:FETCH_HOME_LIST_FAILED,
		error:error
	}
}

export const clearHomelistState = () => {
	return {
		type:CLEAR_HOME_LIST_STATE
	}
}