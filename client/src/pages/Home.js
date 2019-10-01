import React from "react";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import UserProfile from "../components/UserProfile";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      platform: "origin"
    };
  }

  onChangeUsername = (name, platform) => {
    this.setState({
      username: name,
      platform: platform
    });
  };

  render() {
    const { username, platform } = this.state;
    return (
      <div>
        <Logo />
        <SearchBar username={username} platform={platform} onChangeUsername={this.onChangeUsername} />
        {username && <UserProfile username={username} platform={platform} />}
      </div>
    );
  }
}

export default Home;
