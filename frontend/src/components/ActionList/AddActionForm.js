import React from 'react';
import {Form, Button} from 'semantic-ui-react';

import AddActionList from './AddActionList';

export default class AddActionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date:"",
            label:"",
            amount:0,
            list:[
                {id:1, date:"01/12/2020", label:"KMarcket", amount:"85.26"}
            ]
        }        
    }

    render() {
        return(
            <div id="addAction">
                <Form>
                    <Form.Field>
                        <label htmlFor="dateAction">date: </label>
                        <input type="text"
                                name="date"
                                onChange={this.onChange}
                                value={this.state.date}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="label">label: </label>
                        <input type="text"
                                name="label"
                                onChange={this.onChange}
                                value={this.state.label}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="amount">amount: </label>
                        <input type="text"
                                name="amount"
                                onChange={this.onChange}
                                value={this.state.amount}
                        />
                    </Form.Field>
                    <Button type="submit">Add the new action</Button>

                    <AddActionList list={this.props.list}/>
                </Form>
            </div>
        )
    }

}