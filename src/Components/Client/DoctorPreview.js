import * as React from 'react';

class DoctorPreview extends React.Component {
    render() {
        return (
            <div>
                <span>{this.props.doctor}</span><br/>
                <span>{this.props.address}</span><br/>
                <span>{this.props.availabilities.slice(0, 3).join(" - ")}</span><br/>
                <button onClick={e => this.props.onClick(e)}>See more</button><br/><br/>
            </div>
        );
    }
}

export default DoctorPreview;