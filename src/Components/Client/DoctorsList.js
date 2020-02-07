import * as React from 'react';
import DoctorPreview from './DoctorPreview';

class DoctorsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [
                {id: 1, fullname: "Maxime", availabilities: ["16/01/2020 15:00", "17/01/2020 10:00"]},
                {id: 2, fullname: "Anthony", availabilities: ["15/01/2020 17:00", "18/01/2020 14:30"]}
            ]
        };
    }
    render() { 
        return (
            <div>
                {this.state.doctors.map((doctor) => (
                    <DoctorPreview id={doctor.id} doctor={doctor.fullname} availabilities={doctor.availabilities}></DoctorPreview>
                ))}
            </div>
        );
    }
}
 
export default DoctorsList;