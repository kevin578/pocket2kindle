import React from 'react';
import axios from 'axios';

class SignIn extends React.Component {

    signIn = ()=> {
        window.location = '/api/register'
    }

    render() {
        return (
            <div>
                <button onClick = {this.signIn}>Sign in</button>
            </div>
        )
    }
}

export default SignIn;
