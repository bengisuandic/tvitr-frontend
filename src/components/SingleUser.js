import React from "react";
import axios from "axios";
import TweetList from "../components/TweetList"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../styles/tweetCard.css";

export default class SingleUserJS extends React.Component {
  state = {
    user: {},
    tweets: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/users/singleUser/" + this.props.userId)
      .then((res) => {
        const user = res.data;
        this.setState({ user });
      });
      axios
      .get("http://localhost:3000/tweets/userTweets/" + this.props.userId)
      .then((res) => {
        const tweets = res.data;
        this.setState({ tweets });
      });
  }

  render() {
    return (
      <div>
        <AccountCircleIcon fontSize="large" />
        <h3>{this.state.user.name}</h3>
        <h4>{this.state.user.age} years old.</h4>
        <div>
          {this.state.user.tweetCount !== 0 ? (
            <>
              <p style={{ margin: "0" }}>--Their Tweets--</p>
              <div style={{ margin: "0px 0px" }}>
                <TweetList tweets={this.state.tweets} userId={this.state.user._id} inUserProfile="1" />
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
