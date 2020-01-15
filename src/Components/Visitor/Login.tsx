import * as React from 'react';
import {
    Link
} from 'react-router-dom'

export interface LoginProps {}
 
export interface LoginState {
    email: string
    password: string
}
 
class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleEmailChange(e: any) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e: any) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e: any) {
        e.preventDefault();
    }
    
    render() { 
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input type="text" placeholder="Email" onChange={e => this.handleEmailChange(e)} />
                    <input type="password" placeholder="Password" onChange={e => this.handlePasswordChange(e)} />
                    <input type="submit" value="Log in" />
                </form>
                <Link to="/register">Not a member, register</Link>
            </div>
        );
    }
}
 
export default Login;