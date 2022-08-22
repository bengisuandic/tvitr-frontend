import React from "react";
import axios from "axios";
import TweetList from "../components/TweetList";
import { Box, Card } from "@mui/material";
import "../styles/cards.css";

export default class SingleUserJS extends React.Component {
  state = {
    user: {
      tweets: [],
    },
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/users/singleUser/" + this.props.userId)
      .then((res) => {
        const user = res.data;
        console.log("Axios user:", user);
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
      <div className="whole-profile">
        <Card className="profile-upper-card">
          <div className="profile-upper-card-left">
            <Box
              component="img"
              className="profile-picture-box"
              alt="User profile picture"
              src={this.state.user._img}
            />
            <div>
              <h3>{this.state.user.name}</h3>
              <h4>{this.state.user.age} years old.</h4>
            </div>
          </div>
          <div className="profile-upper-card-right">
            @{this.state.user.username}
          </div>
        </Card>
        <div>
          {this.state.user.tweetCount !== 0 ? (
            <>
              <p style={{ margin: "0" }}>--Their Tweets--</p>
              <div style={{ margin: "0px 0px" }}>
                <TweetList userId={this.props.userId} inUserProfile="1" />
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
