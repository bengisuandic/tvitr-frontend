import React from "react";
import axios from "axios";
import TweetList from "./TweetList";
import Logout from "./Logout";
import { getSingleUser } from "../API/api";

export default class MyUser extends React.Component {
  state = {
    user: {
      tweets: [],
    },
  };

  async componentDidMount() {
    console.log(this.props);
    const user = await getSingleUser(this.props.userId);
    this.setState({ user });
  }

  render() {
    return (
      <div>
        <h3>Hello, {this.state.user.name}</h3>
        {this.state.user.tweetCount > 0 ? (
          <>
            <p>---Your Tweets---</p>
            <TweetList
              userId={this.state.user._id}
              token={this.props.token}
              inUserProfile="1"
              inMyProfile="1"
            />
          </>
        ) : (
          <p>You have no tweets yet</p>
        )}
        <Logout />
      </div>
    );
  }
}
