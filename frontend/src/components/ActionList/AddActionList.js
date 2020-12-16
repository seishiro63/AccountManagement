import React from 'react';
import {Table} from 'semantic-ui-react';

import RowHome from './RowHome';
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
                <RowHome item={item} key={item.id}
                     handleEditButton={this.handleEditButton}
                />
            )
        })

        return (
            <Table striped>
                <Table.Header>
                    <Table.RowHome>
                        <Table.HeaderCell>Action date</Table.HeaderCell>
                        <Table.HeaderCell>Label</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Edit row</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.RowHome>
                </Table.Header>
                <Table.Body>
                    {items}
                </Table.Body>
            </Table>
        )
    }
}