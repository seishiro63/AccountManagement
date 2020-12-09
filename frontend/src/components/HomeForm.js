import React from 'react';
import {Form, Button, Menu, Dropdown} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class HomeForm extends React.Component {
   

    render() {

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
            </div>
        )
    }

}