import * as React from 'react';
import {
    Link
} from 'react-router-dom'
import {url, loginRequest} from '../../Services/API';
import { connect } from 'react-redux'
import swal from 'sweetalert';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            type: "",
            email: "",
            password: "",
            address: "",
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.password.length <= 6) {
            swal({
                title: "Mauvais mot de passe",
                text: "Votre mot de passe doit faire plus de 6 caractères",
                icon: "error"
            })
        }
        fetch(url + "/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                fullname: this.state.fullname,
                roles: [this.state.type],
                adress: this.state.address
            }),
        })
        .then((res) => res.json())
        .then(data => {
            if (data.id !== null) {
                loginRequest(this.state.email, this.state.password)
                .then((data, token) => {
                    let currentUser = null
        
                    data["hydra:member"].forEach((user) => {
                        if (user.email === this.state.email) {
                            currentUser = user
                        }
                    });
        
                    let role = currentUser.roles.includes("ROLE_DOCTOR") ? 'doctor' : 'client'
                    this.props.dispatch({ type: 'CONNECT_USER', role: role, user: currentUser, token: token})
                })
            }
            else {
                swal({
                    title: "Erreur",
                    text: "Veuillez remplir tous les champs et mettre une adresse email qui n'existe pas",
                    icon: "error"
                })
            }
        })
        .catch(() => {
            swal({
                title: "Erreur",
                text: "Veuillez remplir tous les champs et mettre une adresse email qui n'existe pas",
                icon: "error"
            })
        })
    }

    render() { 
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <select value={this.state.type} name="type" onChange={e => this.handleChange(e)}>
                        <option value="ROLE_CLIENT">Client</option>
                        <option value="ROLE_DOCTOR">Doctor</option>
                    </select>
                    <input type="text" name="fullname" placeholder="Fullname" onChange={e => this.handleChange(e)} />
                    <input type="text" name="address" placeholder="Address" onChange={e => this.handleChange(e)} />
                    <input type="text" name="email" placeholder="Email" onChange={e => this.handleChange(e)} />
                    <input type="password" name="password" placeholder="Password" onChange={e => this.handleChange(e)} />
                    <input type="submit" value="Register" />
                </form>
                <Link to="/login">Already member, log in</Link>
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

export default connect(mapStateToProps, dispatchToProps)(Register);