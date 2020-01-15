import * as React from 'react';

export interface DoctorProps {
    
}
 
export interface DoctorState {
    
}
 
class Doctor extends React.Component<DoctorProps, DoctorState> {
    constructor(props: DoctorProps) {
        super(props);
        this.state = {};
    }
    render() { 
        return (
            <div></div>
        );
    }
}
 
export default Doctor;