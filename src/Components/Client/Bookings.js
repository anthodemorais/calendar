import * as React from 'react';
import { connect } from 'react-redux';
import { getReservations, deleteReservation } from '../../Services/API';
import swal from 'sweetalert';

class Bookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: []
        };
    }

    componentDidMount() {
        getReservations(this.props.token)
        .then(data => {
            data["hydra:member"].filter(booking => booking.client["@id"].slice(-1) === this.props.user.id.toString())
            this.setState({ bookings: data["hydra:member"] })
        })
    }

    handleCancel(id) {
        deleteReservation(this.props.token, id)
        .then(data => swal({ title: "Canceled reservation", icon: "success" }))
        // .catch(error => swal({ title: "Could not cancel reservation", icon: "error" }))
    }

    render() { 
        return (
            <div>
                {this.state.bookings.map(booking => {
                    return <div>
                        <p>Doctor : {booking.doctor.fullname}</p>
                        <button onClick={e => this.handleCancel(booking.id)}>Cancel</button>
                    </div>
                })}
                {this.state.bookings.length === 0 && <p>No reservation</p>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}
 
export default connect(mapStateToProps)(Bookings);