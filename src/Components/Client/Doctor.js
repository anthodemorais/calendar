import * as React from 'react';
 
class Doctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: {
                fullname: "Maxime",
                availbilities: ["16/01/2020 15:00", "17/01/2020 10:00", "15/01/2020 17:00", "18/01/2020 14:30"]
            }
        };
    }

    handleReservation(date) {

    }

    render() {
        return (
            <div>
                <p>{this.state.doctor.fullname}</p>
                {this.state.doctor.availbilities.map((availability) => (
                    <div>
                        <span>{availability}</span><br/>
                        <button onClick={e => this.handleReservation(availability)}>Book availability</button>
                    </div>
                ))}
            </div>
        );
    }
}
 
export default Doctor;