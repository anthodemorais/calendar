import * as React from 'react';
import {
    Link, Redirect
} from 'react-router-dom'
import { loginRequest } from '../../Services/API';
import { connect } from 'react-redux'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            shouldRedirect: false,
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        loginRequest(this.state.email, this.state.password)
        .then((data, token) => {
            let currentUser = null
            let doctors = []

            data["hydra:member"].forEach((user) => {
                if (user.email === this.state.email) {
                    currentUser = user
                }

                if (user.roles.includes("ROLE_DOCTOR")) {
                    doctors.push(user)
                }
            });

            let role = currentUser.roles.includes("ROLE_DOCTOR") ? 'doctor' : 'client'
            this.props.dispatch({ type: 'CONNECT_USER', role: role, user: currentUser, doctors: doctors, token: token})
            this.setState({ shouldRedirect: true });
        })
    }
    
    render() { 
        return (
            <div>
                {this.state.shouldRedirect && <Redirect to="/" />}
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input type="text" name="email" placeholder="Email" onChange={e => this.handleChange(e)} />
                    <input type="password" name="password" placeholder="Password" onChange={e => this.handleChange(e)} />
                    <input type="submit" value="Log in" />
                </form>
                <Link to="/register">Not a member, register</Link>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return state
}

let dispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, dispatchToProps)(Login)