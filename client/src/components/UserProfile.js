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
      isServerDown: false,
      profileFound: null,
      comments: null,
      username: this.props.username,
      platform: this.props.platform
    };
  }

  componentDidUpdate(prevProps) {
    console.log("updated", this.props.username);
    if (this.props.username !== prevProps.username || this.props.platform !== prevProps.platform) {
      this.setState({ username: this.props.username, platform: this.props.platform });
      this.fetchData(this.props.username, this.props.platform);
    }
  }

  componentDidMount() {
    const { platform, username } = this.props;
    this.setState({ username: username, platform: platform });
    this.fetchData(username, platform);
  }

  fetchData(username, platform) {
    console.log(platform, username);
    axios
      .get(`/api/v1/profile/${platform}/${username}`)
      .then(data => {
        this.setState({ userProfile: data.data.data, isLoading: false, profileFound: true });
      })
      .catch(error => {
        this.setState({ userProfile: null, isLoading: false, profileFound: false });
      });
    axios
      .get(`/api/v1/comments/${username}`)
      .then(data => {
        this.setState({ comments: data.data });
      })
      .catch(error => {
        console.log("Could not fetch comments");
      });
  }

  rendersomething() {
    return <h1>hello</h1>;
  }

  render() {
    let { userProfile, isServerDown, isLoading, comments, profileFound } = this.state;
    let legendStats = null;
    console.log(userProfile);
    if (userProfile && userProfile.segments.length > 1) {
      legendStats = _.cloneDeep(userProfile.segments);
      legendStats.shift();
    }
    return (
      <div className="main-container">
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
        {!profileFound && !isLoading && (
          <div
            className="ui segment"
            style={{ flexGrow: "1", height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="ui aligned red header">Profile not found!</div>
          </div>
        )}
        {userProfile && profileFound && (
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
                  <div>Level {userProfile.segments[0].stats.level.displayValue}</div>
                </div>
              </div>
            </div>
            <div className="overview-card">
              <div className="ui segment">
                <div className="ui medium centered header">Overview</div>
                <div className="overview-stats-container">
                  {Object.entries(userProfile.segments[0].stats).map(stat => (
                    <div className="overview statistic">
                      <div className="label">{`${stat[1].displayName}`}</div>
                      <div className="value">{`${stat[1].displayValue}`}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="legend-stats-container">
              {legendStats.length &&
                legendStats.map(legend => (
                  <div className="legend-card">
                    <div className="legend-card-header">
                      <div className="ui medium header">{legend.metadata.name}</div>
                    </div>
                    <div className="legend-card-content">
                      <div className="legend-card-image">
                        <img src={legend.metadata.tallImageUrl} alt={legend.metadata.name}></img>
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
            <div className="comments-container">
              <div className="ui comments">
                <h3 className="ui dividing header">Comments</h3>
                {comments ? (
                  comments.map(comment => (
                    <div className="comment">
                      <div className="avatar">
                        <img src={userProfile.platformInfo.avatarUrl} alt={userProfile.platformInfo.platformUserHandle} />
                      </div>
                      <div className="content">
                        <div className="author">{comment.commentBy}</div>
                        <div className="metadata">
                          <span className="date">{comment.commentAt}</span>
                        </div>
                        <div className="text black">{comment.comment}</div>
                        <div className="actions">
                          <div className="reply">Reply</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Enter your first comment</div>
                )}
                <form class="ui reply form">
                  <div class="field">
                    <textarea></textarea>
                  </div>
                  <div class="ui primary submit labeled icon button">
                    <i class="icon edit"></i> Add Comment
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserProfile;
