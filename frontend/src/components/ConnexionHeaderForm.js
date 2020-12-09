import React from 'react';
import {Form, Button} from 'semantic-ui-react';

export default class ConnexionHeaderForm extends React.Component {

    render() {
        if (this.props.isLogged) {  //user is logged
            return(
                <div id="connection">
                    <Form>
                        <label htmlFor="user">{this.props.username}</label>
                        <label htmlFor="logout">logout</label>
                    </Form>
                </div>
            );
        }
        else {  //user not loged => request login / register
            return(
                <div id="connection">
                    <Form>

                    </Form>
                </div>
            );
        }
    }

}