import React from 'react';
import {Table, Button, Dropdown} from 'semantic-ui-react';

export default class EditRow extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			date:props.item.date,
			label:props.item.label,
            amount:props.item.amount
		}
    }
    
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	saveItem = (event) => {
		event.preventDefault();
		let item = {
			id:this.props.item.id,
			date:this.state.date,
			label:this.state.label,
			amount:this.state.amount
		}
		console.log("save of item id: " + this.props.item.id);
		this.props.editItem(item);
	}
	
	render() {
		return(
			<Table.Row>
				<Table.Cell><input type="text"
									name="date"
									onChange={this.onChange}
									value={this.state.date}/></Table.Cell>
				<Table.Cell><input type="text"
									name="label"
									onChange={this.onChange}
									value={this.state.label}/></Table.Cell>
				<Table.Cell><input type="number"
									step="0.01"
									name="amount"
									onChange={this.onChange}
									value={this.state.amount}/></Table.Cell>
				<Table.Cell><Button color="green" onClick={this.saveItem}>Save</Button></Table.Cell>
				<Table.Cell><Button color="grey" onClick={() => this.props.cancel()}>Cancel</Button></Table.Cell>
			</Table.Row>
        )
    }
}
