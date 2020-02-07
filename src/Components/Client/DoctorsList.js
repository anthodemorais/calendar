import * as React from 'react';
import { connect } from 'react-redux'
import DoctorPreview from './DoctorPreview';
import { getAvailabilities } from '../../Services/API';
import Doctor from './Doctor';
import { Link } from 'react-router-dom';

class DoctorsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            selectedDoctor: null
        };
    }

    componentDidMount() {
        getAvailabilities(this.props.token)
        .then(data => {
            let doctors = {}
            for (let index in data["hydra:member"]) {

                let availability = data["hydra:member"][index]
                let doctor = availability.doctor

                if (doctors[doctor.fullname] !== undefined) {
                    doctors[doctor.fullname].dates.push(availability.date)
                }
                else {
                    doctors[doctor.fullname] = {
                        id: availability.id,
                        doctorId: doctor["@id"].slice(-1),
                        fullname: doctor.fullname,
                        address: doctor.adress,
                        dates: [availability.date]
                    }
                }
            }

            let components = []
            for (let doctor in doctors) {
                components.push(
                    <DoctorPreview
                        key={doctors[doctor].id}
                        id={doctors[doctor].id}
                        doctor={doctor}
                        address={doctors[doctor].adress}
                        availabilities={doctors[doctor].dates}
                        onClick={(e) => this.setState({ selectedDoctor: {fullname: doctor, dates: doctors[doctor].dates, id: doctors[doctor].doctorId} })}
                    />
                )
            }
            this.setState({ doctors: components });
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <Link to="/bookings">My Reservations</Link>
                {this.state.selectedDoctor === null && this.state.doctors}
                {this.state.selectedDoctor !== null &&
                    <Doctor
                        fullname={this.state.selectedDoctor.fullname}
                        dates={this.state.selectedDoctor.dates}
                        id={this.state.selectedDoctor.id}
                    />
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(DoctorsList);