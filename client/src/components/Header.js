import React from 'react';
import apex_logo from '../assets/apex_logo.png'

class Header extends React.Component {
    render() {
        return (
            <div>
                <img src={apex_logo} style={{ width: 300, display: 'block', margin: 'auto' }} alt="Logo" />
            </div>
        )
    }
}

export default Header