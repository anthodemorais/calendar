import * as React from 'react';

class Bookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: {
                doctor: "Anthony",
                dates: ["15/01/2020 17:00", "17/01/2020 10:00",]
            }
        };
    }

    handleCancel(date) {

    }

    render() { 
        return (
            <div>
                <p>Doctor : {this.state.booking.doctor}</p>
                {this.state.booking.dates.map((date) => (
                    <div>
                        <span>{date}</span><br/>
                        <button onClick={e => this.handleCancel(date)}>Cancel</button>
                    </div>
                ))}
            </div>
        );
    }
}
 
export default Bookings;