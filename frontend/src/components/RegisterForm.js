import React from 'react';
import {List, Form, Button} from 'semantic-ui-react';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login:"",
            password:"",
            email:""
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
            email: this.state.email
        }
        if (event.target.name === "register") {
            this.props.register(user);
            this.props.login(user);
        }
    }


    render() {
        return (
            <div style={{width:500, margin:"auto", paddingTop:"20px", textAlign:"left"}}>
                <Form>
                <label>Create an account</label>
                <List>
                    <List.Item>
                        <Form.Input fluid label='Login' 
                                    placeholder='Login' 
                                    name='login'
                                    onChange={this.onChange}
                                    value={this.state.login}/>
                    </List.Item>
                    <List.Item>
                        <Form.Input fluid label='Password' 
                                    placeholder='password' 
                                    name='password'
                                    type="password" 
                                    onChange={this.onChange} 
                                    value={this.state.password}/>
                    </List.Item>
                    <List.Item>
                        <Form.Input fluid label='Email' 
                                    placeholder='user@email.com' 
                                    name='email'
                                    type="text" 
                                    onChange={this.onChange} 
                                    value={this.state.email}/>
                    </List.Item>
                    <List.Item>
                        <div style={{textAlign:"center"}}>
                        <Button onClick={this.onSubmit} name="register">Register</Button>
                        </div>
                    </List.Item>
                </List>
                </Form>
            </div>
        )
    }
}