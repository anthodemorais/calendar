import * as React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export interface HomeProps {
    user_is_logged: boolean
    user_role: string
}
 
export interface HomeState {
    
}
 
class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {};
    }
    render() { 
        if (this.props.user_is_logged) {
            if (this.props.user_role == "client") {
                return (<Redirect to="/doctors"></Redirect>);
            }
            else {
                return (<Redirect to="/availabilities"></Redirect>)
            }
        }
        else {
            return (<Redirect to="/login"></Redirect>)
        }
    }
}

let mapStateToProps = (state) => {
    return {
        user_is_logged: state.user_is_logged,
        user_role: state.user_role
    }
}

export default connect(mapStateToProps)(Home);