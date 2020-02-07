import * as React from 'react';
import { bookAvailability } from '../../Services/API';
import { connect } from 'react-redux';
import swal from 'sweetalert';
 
class Doctor extends React.Component {
    handleReservation() {
        bookAvailability(this.props.token, this.props.user.id, this.props.id)
        .then(data => swal({title: "Reservation registered", icon: "success"}))
        .catch(error => swal({ title: "Cannot register reservation", icon: "error" }))
    }

    render() {
        return (
            <div>
                <p>{this.props.fullname}</p>
                {this.props.dates.map((availability) => (
                    <div>
                        <span>{availability}</span><br/>
                        <button onClick={e => this.handleReservation()}>Book availability</button>
                    </div>
                ))}
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
 
export default connect(mapStateToProps)(Doctor);