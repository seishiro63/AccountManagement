import React from 'react';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class RowHome extends React.Component {

    handleDropDown = (e, value) => {
        console.log(value);
    }

    render() {
        let options = [
            //{ key: 'edit', icon: 'edit', text: 'Edit', value: 'edit' },
            { key: 'delete', icon: 'delete', text: 'Remove', value: 'delete' },
        ]
    
        console.log ("item: " + this.props.item);
        console.log(this.props.item)

        /* struct example: 
            amountConsolidated: 735.43
            available: 2000
            consolidationDate: "30/11/2020"
            id: 101
            label: "saving"
            login: "test"
            pending: 0
            privilege: "owner"
        */
        return(
            <div id="homeaccount">
                <h3>{this.props.item.label}</h3>
                Amount available : <b>{this.props.item.available}</b> &ensp; Pending : {this.props.item.pending}<br/>
                Consolidation date : {this.props.item.consolidationDate}<br/>
                <Link to="/addaction"><Button>add expense</Button></Link>
                <Link to="/lastactions"><Button>Last actions</Button></Link>
                <Link to="/history"><Button>see history</Button></Link>
                <br/>
                <br/>
            </div>
        )
    }
}
