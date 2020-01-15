import * as React from 'react';
import {
    Link
} from 'react-router-dom'

export interface RegisterProps {}
 
export interface RegisterState {
    fullname: string
    email: string
    password: string
}
 
class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            fullname: "",
            email: "",
            password: ""
        };
    }

    handleNameChange(e: any) {
        this.setState({ fullname: e.target.value });
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
                    <input type="text" placeholder="Fullname" onChange={e => this.handleNameChange(e)} />
                    <input type="text" placeholder="Email" onChange={e => this.handleEmailChange(e)} />
                    <input type="password" placeholder="Password" onChange={e => this.handlePasswordChange(e)} />
                    <input type="submit" value="Log in" />
                </form>
                <Link to="/login">Already member, log in</Link>
            </div>
        );
    }
}
 
export default Register;