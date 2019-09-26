import React from "react";
import axios from "axios";
import _ from "lodash";
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
        console.log(data.data.data);
        this.setState({ userProfile: data.data.data, isLoading: false });
      })
      .catch(error => {
        // var response = error.response;
        console.log(error.config);
        // if (!response.status) {
        //   this.setState({ userProfile: null, isLoading: false, isServerDown: true });
        // }
      });
  }

  rendersomething() {
    return <h1>hello</h1>;
  }

  render() {
    let { userProfile, isServerDown, isLoading } = this.state;
    let legendStats = null;
    if (userProfile) {
      legendStats = _.cloneDeep(userProfile.segments);
      legendStats.shift();
      console.log(Object.entries(legendStats[1].stats));
    }
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
              <div className="ui massive text loader">Loading</div>
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
                <div className="content details" style={{ marginTop: "1rem" }}>
                  <h4>{userProfile.platformInfo.platformUserHandle}</h4>
                  <div className="meta">
                    <span className="date">{userProfile.platformInfo.platformSlug}</span>
                  </div>
                  <div className="description">Rank {userProfile.segments[0].stats.rankScore.value}</div>
                </div>
                <div className="extra content level">
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
            <div className="legend-stats-container">
              {legendStats.map(legend => (
                <div className="legend-card">
                  <div className="legend-card-header">
                    <div className="ui medium header">{legend.metadata.name}</div>
                  </div>
                  <div className="legend-card-content">
                    <div className="legend-card-image">
                      <img src={legend.metadata.tallImageUrl}></img>
                    </div>
                    <div className="legend-card-stats">
                      {Object.entries(legend.stats).map(stat => (
                        <div className="statistic">
                          <div className="value">{stat[1].displayValue}</div>
                          <div className="label">{stat[1].displayName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

function Render({ legendStats }) {
  console.log(legendStats);
  return (
    <div className="legend-stats">
      <div className="legend-card">
        <div className="legend-card-header">
          <div className="ui small header">LIFELINE</div>
        </div>
        <div className="legend-card-content">
          <div className="legend-card-image">
            <img src="https://trackercdn.com/cdn/apex.tracker.gg/legends/pathfinder-tall.png"></img>
          </div>
          <div className="legend-card-stats" style={{ marginLeft: "2vh" }}>
            <div className="ui tiny three statistics">
              <div className="statistic">
                <div className="value">22</div>
                <div className="label">Saves</div>
              </div>
              <div className="statistic">
                <div className="value">23</div>
                <div className="label">Saves</div>
              </div>
              <div className="statistic">
                <div className="value">23</div>
                <div className="label">Saves</div>
              </div>
              <div className="statistic">
                <div className="value">23</div>
                <div className="label">Saves</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="legend-card">
        <div className="legend-card-header">
          <div className="ui small header">LIFELINE</div>
        </div>
        <div className="legend-card-content">
          <div className="legend-card-image">
            <img src="https://trackercdn.com/cdn/apex.tracker.gg/legends/pathfinder-tall.png"></img>
          </div>
          <div className="legend-card-stats" style={{ marginLeft: "2vh" }}>
            <div className="ui tiny three statistics">
              <div className="statistic">
                <div className="value">22</div>
                <div className="label">Saves</div>
              </div>
              <div className="statistic">
                <div className="value">23</div>
                <div className="label">Saves</div>
              </div>
              <div className="statistic">
                <div className="value">23</div>
                <div className="label">Saves</div>
              </div>
              <div className="statistic">
                <div className="value">23</div>
                <div className="label">Saves</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
