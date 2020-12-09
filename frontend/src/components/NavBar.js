import React from 'react';
import {Form, Menu, Dropdown} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class NavBarForm extends React.Component {
   

    render() {
        const menuStyle = {
            border: 'none',
            borderRadius: 0,
            boxShadow: 'none',
            marginBottom: '1em',
            backgroundColor: 'transparent',
            transition: 'box-shadow 0.5s ease, padding 0.5s ease',
        }

        return(
            <div id="bandeau">
                <Form >
                    <Menu style={menuStyle}>
                        <Menu.Item>
                            <Link to="/">Home</Link>

                        </Menu.Item>
                        <Dropdown text='My Accounts' pointing className='link item'>
                            <Dropdown.Menu>
                                <Dropdown.Item>account 1</Dropdown.Item>
                                <Dropdown.Item>account 2</Dropdown.Item>
                                <Dropdown.Item>account 3</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item><Link to="/admin">Administration</Link></Menu.Item>
                    </Menu>
                </Form>
            </div>
        )
    }

}