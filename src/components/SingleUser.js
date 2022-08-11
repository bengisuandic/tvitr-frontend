import React from "react";
import axios from "axios";
import Tweets from "../routes/tweets";
import TweetList from "../components/TweetList"
import "../styles/tweetCard.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default class SingleUserJS extends React.Component {
  state = {
    user: {},
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/users/" + this.props.userId)
      .then((res) => {
        const user = res.data;
        this.setState({ user });
      });
  }

  render() {
    return (
      <div>
        <AccountCircleIcon fontSize="large" />
        <h3>{this.state.user.name}</h3>
        <h4>{this.state.user.age} years old.</h4>
        <div>
          {this.state.user.tweetCount > 0 ? (
            <>
              <p style={{ margin: "0" }}>--Their Tweets--</p>
              <div style={{ margin: "0px 0px" }}>
                <TweetList tweets={this.state.user.tweets} inUserProfile="1" />
              </div>
            </>
          ) : (
            <p>No tweets yet</p>
          )}
        </div>
      </div>
    );
  }
}
