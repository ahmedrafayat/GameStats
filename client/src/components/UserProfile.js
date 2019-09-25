import React from "react";
import axios from "axios";
import "../styles/UserProfile.css";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: null,
      isLoading: true,
      isServerDown: false
    };
  }

  componentDidMount() {
    const { platform, username } = this.props.match.params;
    axios
      .get(`/api/v1/profile/${platform}/${username}`)
      .then(data => {
        console.log(data);
        this.setState({ userProfile: data.data.data, isLoading: false });
      })
      .catch(error => {
        if (error.response.status) {
          this.setState({ userProfile: null, isLoading: false, isServerDown: true });
        }
      });
  }

  render() {
    let { userProfile, isServerDown, isLoading } = this.state;
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
        {isServerDown && (
          <div className="ui negative message" style={{ flex: "1" }}>
            <div className="header">Ummh, this is awkward :/</div>
            <p>It looks like we are facing some issues communicating with our server. Maybe your internet connection is down?</p>
          </div>
        )}
        {isLoading && (
          <div className="ui segment" style={{ flexGrow: "1", height: "20vh", backgroundColor: "#953036" }}>
            <div className="ui active inverted dimmer">
              <div class="ui massive text loader">Loading</div>
            </div>
          </div>
        )}
        {userProfile && (
          <div className="profile">
            <div className="profile-card">
              <div className="ui card">
                <div className="square image">
                  <img src={userProfile.platformInfo.avatarUrl} alt={userProfile.platformInfo.platformUserHandle} />
                </div>
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
            <div className="overview-card">
              <div className="ui medium header">Overview</div>
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
            <div className="legend-card-lifeline">
              <div className="legend-card-header">
                <div className="ui small header">LIFELINE</div>
              </div>
              <div className="legend-card-content">
                <div className="legend-card-image">
                  <img src="https://trackercdn.com/cdn/apex.tracker.gg/legends/pathfinder-tall.png"></img>
                </div>
                <div className="legend-card-stats" style={{ marginLeft: "2vh" }}>
                  <div className="ui tiny three statistics">
                    <div class="statistic">
                      <div class="value">22</div>
                      <div class="label">Saves</div>
                    </div>
                    <div class="statistic">
                      <div class="value">23</div>
                      <div class="label">Saves</div>
                    </div>
                    <div class="statistic">
                      <div class="value">23</div>
                      <div class="label">Saves</div>
                    </div>
                    <div class="statistic">
                      <div class="value">23</div>
                      <div class="label">Saves</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="legend-card-pathfinder">
              <div className="legend-card-header">
                <div className="ui small header">PATHFINDER</div>
              </div>
              <div className="legend-card-content">
                <div className="legend-card-image"></div>
                <div className="legend-card-stats"></div>
              </div>
            </div>
            <div className="legend-card-wraith">
              <div className="legend-card-header">
                <div className="ui small header">WRAITH</div>
              </div>
              <div className="legend-card-content">
                <div className="legend-card-image"></div>
                <div className="legend-card-stats"></div>
              </div>
            </div>
            <div className="legend-card-bangalore">
              <div className="legend-card-header">
                <div className="ui small header">BANGALORE</div>
              </div>
              <div className="legend-card-content">
                <div className="legend-card-image"></div>
                <div className="legend-card-stats"></div>
              </div>
            </div>
            <div className="legend-card-gibraltar">
              <div className="legend-card-header">
                <div className="ui small header">GIBRALTAR</div>
              </div>
              <div className="legend-card-content">
                <div className="legend-card-image"></div>
                <div className="legend-card-stats"></div>
              </div>
            </div>
            <div className="legend-card-caustic">
              <div className="legend-card-header">
                <div className="ui small header">CAUSTIC</div>
              </div>
              <div className="legend-card-content">
                <div className="legend-card-image"></div>
                <div className="legend-card-stats"></div>
              </div>
            </div>
            <div className="legend-card-octane">
              <div className="legend-card-header">
                <div className="ui small header">OCTANE</div>
              </div>
              <div className="legend-card-content">
                <div className="legend-card-image"></div>
                <div className="legend-card-stats"></div>
              </div>
            </div>
            <div className="legend-card-mirage">
              <div className="legend-card-header">
                <div className="ui small header">MIRAGE</div>
              </div>
              <div className="legend-card-content">
                <div className="legend-card-image"></div>
                <div className="legend-card-stats"></div>
              </div>
            </div>
            <div className="legend-card-wattson">
              <div className="legend-card-header">
                <div className="ui small header">WATTSON</div>
              </div>
              <div className="legend-card-content">
                <div className="legend-card-image"></div>
                <div className="legend-card-stats"></div>
              </div>
            </div>
            <div className="legend-card-bloodhound">
              <div className="legend-card-header">
                <div className="ui small header">BLOODHOUND</div>
              </div>
              <div className="legend-card-content">
                <div className="legend-card-image"></div>
                <div className="legend-card-stats"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserProfile;
