import React from "react";
import axios from "axios";
import TweetList from "./TweetList";

var userId = "62eb67e72243ec803a341a67";

export default class MyUser extends React.Component {
  state = {
    user: {
      tweets: [],
    },
  };

  componentDidMount() {
    try {
      axios.get("http://localhost:3000/users/" + userId).then((res) => {
        const user = res.data;
        this.setState({ user });
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h3>Hello, {this.state.user.name}</h3>
        {this.state.user.tweets.length > 0 ? (
          <>
            <p>---Your Tweets---</p>
            <TweetList
              tweets={this.state.user.tweets}
              inUserProfile="1"
              inMyProfile="1"
            />
          </>
        ) : (
          <p>You have no tweets yet</p>
        )}
      </div>
    );
  }
}
