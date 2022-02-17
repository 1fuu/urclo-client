import React, { Component } from 'react';
import Template from '../components/Template';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';

class Auth extends Component {
    render() {
        return (
            <Template>
                <LoginContainer />
                <RegisterContainer />
            </Template>
        );
    }
}

export default Auth;