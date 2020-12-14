import React from 'react';
import {Form} from 'semantic-ui-react';

export default class ConnexionHeaderForm extends React.Component {


    onSubmit = (event) => {
        event.preventDefault();
        console.log("disconnect requested: " + event.target.name)
        let user = {
            login: this.props.login,
            token:this.props.token
        }
            this.props.logout(user);
    } 

    render() {
        if (this.props.isLogged) {  //user is logged
            return(
                <div id="connection">
                    <Form>
                        <label htmlFor="user" 
                               style={{paddingLeft:"20px", textAlign:"left"}}>
                                   {this.props.login}
                        </label>
                        <label htmlFor='logout' 
                               name='logout'
                               onClick={this.onSubmit}
                               style={{paddingLeft:"20px", textAlign:"left"}}
                               >
                                logout
                        </label>
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