import React from 'react';
import RowHome from './ActionList/RowHome';
import {Form, Button, Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';


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
        this.props.getList("/api/accountlist");
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
export default connect()(HomeForm);