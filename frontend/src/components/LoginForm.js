import React from 'react';
import {Header, List, Form, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login:"",
            password:""
        }
    }

    onChange = (event) => {
        let state = {};
        this.state[event.target.name] = event.target.value;
        this.setState(state);
    }

    onSubmit = (event) => {
        event.preventDefault();
        let user = {
            login: this.state.login,
            password: this.state.password,
        }

        if (event.target.name === "login") {
            this.props.login(user);
        }
    } 


    render() {
        
        //if(!this.props.register){
            return (
                <div style={{width:500, margin:"auto", paddingTop:"20px", textAlign:"left"}}>
                <Form>
                    <label>You allready have an account, please singin</label>
                    <List>
                        <List.Item>
                            <Form.Input fluid label='Login' 
                                        placeholder='Login' 
                                        name='loginlogin'
                                        onChange={this.onChange}
                                        value={this.state.login}/>
                        </List.Item>
                        <List.Item>
                            <Form.Input fluid label='Password' 
                                        placeholder='password' 
                                        name='passwordlogin'
                                        type="password" 
                                        onChange={this.onChange} 
                                        value={this.state.password}/>
                        </List.Item>
                        <List.Item>
                            <div style={{textAlign:"center"}}>
                            <Button onClick={this.onSubmit} name="login">Login</Button>
                            </div>
                        </List.Item>
                    </List>
                </Form>

                <div style={{width:500, margin:"auto", paddingTop:"20px", textAlign:"left"}}>
                    <Form>
                        <label>Create an account</label>
                        <List>
                            <List.Item>
                                <div style={{textAlign:"center"}}>
                                    <Link to="/register">
                                        <Button >Register</Button>
                                    </Link>
                                </div>
                            </List.Item>
                        </List>
                    </Form>
                </div>

                </div>
            )
    }
}