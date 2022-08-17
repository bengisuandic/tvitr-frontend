import React from "react";
import axios from "axios";
import TweetList from "./TweetList";

export default class MyUser extends React.Component {
  state = {
    user: {
      tweets: [],
    },
  };
  //DÜZELT BURALARI HEP alooo
  componentDidMount() {
    try {
      axios.get("http://localhost:3000/users/singleUser/" + this.props.userId).then((res) => {
        const user = res.data;
        console.log("Profile:", user)
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
        {this.state.user.tweetCount > 0 ? (
          <>
            <p>---Your Tweets---</p>
            <TweetList
              userId={this.state.user._id}
              token={this.props.token}
              inUserProfile="1"
              inMyProfile="1" />
          </>
        ) : (
          <p>You have no tweets yet</p>
        )}
      </div>
    );
  }
}
