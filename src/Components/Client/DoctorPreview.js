import * as React from 'react';
import { Link } from 'react-router-dom';

class DoctorPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() { 
        return (
            <div>
                <span>{this.props.doctor}</span><br/>
                <span>{this.props.availabilities.join(" - ")}</span><br/>
                <Link to={`/doctors/book/${this.props.id}`}>See more</Link><br/><br/>
            </div>
        );
    }
}
 
export default DoctorPreview;