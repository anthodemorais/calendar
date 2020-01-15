import * as React from 'react';

export interface HeaderProps {
    
}
 
export interface HeaderState {
    
}
 
class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = {};
    }
    render() { 
        return (
            <div></div>
        );
    }
}
 
export default Header;