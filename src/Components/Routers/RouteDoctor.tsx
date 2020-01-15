import * as React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export interface RouteDoctorProps {
    user_is_logged: boolean
    user_role: string
}
 
export interface RouteDoctorState {}
 
class RouteDoctor extends React.Component<RouteDoctorProps, RouteDoctorState> {
    constructor(props: RouteDoctorProps) {
        super(props);
        this.state = {};
    }
    render() { 
        if (this.props.user_is_logged === true && this.props.user_role == "doctor") {
            return (
                this.props.children
            )
        } else {
            return (<Redirect to="/"></Redirect>)
        }
    }
}

let mapStateToProps = (state) => {
    return {
        user_is_logged: state.user_is_logged,
        user_role: state.user_role
    }
}

export default connect(mapStateToProps)(RouteDoctor);