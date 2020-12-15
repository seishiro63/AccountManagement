import React from 'react';
import {Form, Button, Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class HomeForm extends React.Component {
   
    constructor(props) {
        super(props);
        
    }

    /**
     * componentWillMount
     *  Lifecycle Methods
     * componentWillMount is executed before rendering, on both the server and the client side
     */
    /*
    componentWillMount (){
        console.log("HomeForm request list of account");
        this.props.getList("/api/accountlist");
    }
    */
    /*
    componentDidMount()  {
        console.log("HomeForm request list of account");
        this.props.getList("/api/accountlist");
    }
    */
    render() {
        let items = this.props.list.map((item, index) => {
            return (
                /*
                <Row item={item} key={item.id} handleRemoveButton={this.handleRemoveButton} 
                                               handleEditButton={this.handleEditButton} 
                />
                */
               "coin"
            )
        })

        return(
            <div id="home">
                <Form>
                    <h2>Home</h2>
                    <div id="homeaccount"> 
                        <h3>account 1 </h3>
                        My CB account <br/>
                        account amount : 735.43€ &ensp; pending : 523.25€<br/>
                        amount available <b>212.18</b>€<br/>
                        <Link to="/addaction"><Button>add expense</Button></Link>
                        <Link to="/lastactions"><Button>Last actions</Button></Link>
                        <Link to="/history"><Button>see history</Button></Link>
                    </div>
                    <div id="homeaccount"> 
                        <h3>account 2 </h3>
                        My account saving<br></br>
                        account amount : 2000.00€ &ensp; pending : 0.00€<br/>
                        amount available <b>2000.00</b>€<br/>
                        <Link to="/addaction"><Button renderAs={"/addaction"}>add expense</Button></Link>
                        <Link to="/lastactions"><Button>Last actions</Button></Link>
                        <Link to="/history"><Button>see history</Button></Link>
                    </div>
                </Form>
            

            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Item type</Table.HeaderCell>
                        <Table.HeaderCell>Count</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items}
                </Table.Body>
            </Table>
            </div>
        )
    }

}