import React from 'react';
import {Form, Button, TableRow, Table, Item, Dropdown} from 'semantic-ui-react';

import Row from './Row';
import EditRow from './EditRow';


export default class AddActionList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            removeIndex:-1,
            editIndex:-1
        }
    }
    
    cancel = () => {
        this.setState({
            removeIndex:-1,
            editIndex:-1
        })
    }

    editItem = (id) => {
        this.props.editItem(id);
        this.cancel();
    }

    handleEditButton = (id) => {
        for(let i=0; i<this.props.list.length; i++){
            if(id === this.props.list[i].id) {
                this.setState({
                    removeIndex:-1,
                    editIndex:i
                })
            }
        }
    }

    render() {

        let items = this.props.list.map((item, index) => {
            if (index === this.state.editIndex) {
                return (
                    <EditRow item= {item} key={item.id}               
                                editItem={this.editItem}    
                                cancel={this.cancel}
                    />
                )
            }

            return (
                <Row item={item} key={item.id}
                     handleEditButton={this.handleEditButton}
                />
            )
        })

        return (
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Action date</Table.HeaderCell>
                        <Table.HeaderCell>Label</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Edit row</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items}
                </Table.Body>
            </Table>
        )
    }
}