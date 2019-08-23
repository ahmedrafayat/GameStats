import React from 'react'
import axios from 'axios'
import apex_logo from '../assets/apex_logo.png'
import octane_photo from '../assets/octane.png'
import '../styles/Header.css'

const base_url = process.env.TRACKER_API_URL || 'http://localhost:5000/api/v1/profile/';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            selectedPlatform: 'origin',
            userProfile: null
        }
    }

    async getProfile(e) {
        e.preventDefault();
        const res = await axios.get(`/api/v1/profile/${this.state.selectedPlatform}/${this.state.username}`);

        this.setState({ userProfile: res.data.data })
    }


    componentDidMount() {
        console.log(this.state.selectedPlatform)
        console.log(base_url)
    }
    render() {
        return (
            <div className="ui container" style={{ margin: 'auto' }} >
                <img className="ui medium image fluid" style={{ position: 'absolute' }} src={apex_logo} alt="Logo" />
                <img className="ui huge image fluid" style={{ position: 'absolute' }} src={octane_photo} alt="octane-photo" />
                <form className="ui huge form" style={{ marginLeft: 100, marginRight: 100 }}>
                    <div className="field" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <div>
                            <div className="ui icon buttons">
                                <button className="ui icon button" onClick={() => this.setState({ selectedPlatform: 'origin' })}>
                                    <ion-icon name="logo-windows"></ion-icon>
                                </button>
                                <button className="ui icon button" onClick={() => this.setState({ selectedPlatform: 'playstation' })}>
                                    <ion-icon name="logo-playstation"></ion-icon>
                                </button>
                                <button className="ui icon button" onClick={() => this.setState({ selectedPlatform: 'xbox' })}>
                                    <ion-icon name="logo-xbox"></ion-icon>
                                </button>
                            </div>
                            <input placeholder="Enter your user id" style={{ flexGrow: 8 }} onChange={e => { this.setState({ username: e.target.value }) }} type="text" name="username" value={this.state.username} />
                            <div className="ui animated button" tabIndex="0" onClick={(e) => this.getProfile(e)} style={{ marginLeft: 5 }}>
                                <div className="visible content">Next</div>
                                <div className="hidden content">
                                    <i className="right arrow icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default Header