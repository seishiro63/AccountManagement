import React from 'react';
import {Table, Button, Dropdown} from 'semantic-ui-react';

export default class Row extends React.Component {

    handleDropDown = (e, value) => {
        console.log(value);
    }

    render() {
        let options = [
            //{ key: 'edit', icon: 'edit', text: 'Edit', value: 'edit' },
            { key: 'delete', icon: 'delete', text: 'Remove', value: 'delete' },
        ]
    

        return(

            <Table.Row>
                <Table.Cell>{this.props.item.date}</Table.Cell>
                <Table.Cell>{this.props.item.label}</Table.Cell>
                <Table.Cell>{this.props.item.amount}</Table.Cell>
                <Table.Cell>
                    <Button.Group color='teal'>
                        <Button onClick={() => this.props.handleEditButton(this.props.item.id)}>Edit</Button>
                        <Dropdown
                        className='button icon'
                        floating
                        options={options}
                        trigger={<></>}
                        />
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        )
    }
}
