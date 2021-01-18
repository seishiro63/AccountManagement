import React from 'react';
import RowHome from './ActionList/RowHome';

import {connect} from 'react-redux';
import {getList} from '../actions/homeActions';

class HomeForm extends React.Component {
   
    constructor(props) {
        super(props);
    }

    /**
     * componentDidMount
     *  Lifecycle Methods
     *  is invoked immediately after a component is mounted (inserted into the tree). 
     *  Initialization that requires DOM nodes should go here. 
     *  If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     */    
    componentDidMount()  {
        console.log("HomeForm request list of account");
        this.props.dispatch(getList(this.props.token));
    }
    
    render() {
        let items = this.props.list.map((item, index) => {
            return (
                
                <RowHome item={item} key={item.id} 
                />
            )

        })
        console.log(items); 
        return(
            <div id="home">
                {items}
            </div>
        )
    }

}

//getting data from porps:
const mapStateToProps = (state) => {
	return {
		token:state.login.token,
		list:state.homelist.list
	}
}

export default connect(mapStateToProps)(HomeForm);