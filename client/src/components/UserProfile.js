import React from "react";
import axios from "axios";
import "../styles/UserProfile.css";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: null,
      isLoading: true
    };
  }
  componentDidMount() {
    const { platform, username } = this.props.match.params;
    axios.get(`/api/v1/profile/${platform}/${username}`).then(data => {
      this.setState({ userProfile: data.data.data, isLoading: false });
    });
  }
  render() {
    let { userProfile } = this.state;
    console.log(userProfile);
    return (
      <div
        className="main-container"
        style={{
          marginTop: "8rem",
          display: "flex",
          justifyContent: "center",
          width: "100vh"
        }}>
        {userProfile && (
          <div className="profile">
            <div className="profile-card">
              <div className="ui card">
                <div className="square image">
                  <img src={userProfile.platformInfo.avatarUrl} alt="profile picture" />
                  <div className="content">
                    <h4>{userProfile.platformInfo.platformUserHandle}</h4>
                    <div className="meta">
                      <span className="date">{userProfile.platformInfo.platformSlug}</span>
                    </div>
                    <div className="description">Kristy is an art director living in New York.</div>
                  </div>
                  <div className="extra content">
                    <div>Level ${userProfile.segments[0].stats.level.displayValue}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overview-card" style={{ background: "#3759ad" }}>
              <h3>Overview</h3>
              <div className="ui statistics">
                <div className="statistic">
                  <div className="value">{`${userProfile.segments[0].stats.level.displayValue}`}</div>
                  <div className="label">Level</div>
                </div>
                <div className="statistic">
                  <div className="value">{`${userProfile.segments[0].stats.kills.displayValue}`}</div>
                  <div className="label">Kills</div>
                </div>
                <div className="statistic">
                  <div className="value">2.1</div>
                  <div className="label">Damage</div>
                </div>
                <div className="statistic">
                  <div className="value">
                    <i className="crosshairs icon"></i>
                    22
                  </div>
                  <div className="label">Headshots</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserProfile;
