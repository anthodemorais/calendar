import * as React from 'react';
import { connect } from 'react-redux';
import { addAvailability, getAvailabilities, deleteAvailability } from '../../Services/API';

class AvailabilitiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            availabilities: []
        };
    }

    componentDidMount() {
        getAvailabilities(this.props.token)
        .then(data => this.setState({ availabilities: data["hydra:member"] }))
    }

    handleDateChange(e) {
        this.setState({ date: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        addAvailability(this.props.token, this.state.date, this.props.user.id)
        .then(res => {
            getAvailabilities(this.props.token)
            .then(data => this.setState({ availabilities: data["hydra:member"] }))
        })
    }

    removeAvailability(id) {
        deleteAvailability(this.props.token, id)
        .then(data => {
            getAvailabilities(this.props.token)
            .then(data => this.setState({ availabilities: data["hydra:member"] }))
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input type="datetime-local" onChange={e => this.handleDateChange(e)} />
                    <input type="submit" value="Ajouter la disponibilité" />
                </form>
                {this.state.availabilities.map((availability, index) => (
                    <div>
                        <p key={index}>{availability.date}</p>
                        <button onClick={e => this.removeAvailability(availability.id)}>Cancel</button>
                    </div>
                ))}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user
    }
}
 
export default connect(mapStateToProps)(AvailabilitiesList);