import React from "react";
import "../styles/cards.css";

import { store } from "../Store/store";
import SingleTweet from "./SingleTweet";
import { getAllTweets, getUserTweets } from "../API/api";

export default class TweetList extends React.Component {
  constructor() {
    super();
    this.store = store.getState();
  }

  state = {
    tweets: [],
  };

  async componentDidMount() {
    if (this.props.inUserProfile === "1") {
      const tweets = await getUserTweets(this.props.userId);
      this.setState({ tweets });
    } else {
      const tweetDocs = await getAllTweets();
      const tweets = tweetDocs.docs;
      this.setState({ tweets });
    }
  }

  render() {
    return (
      <div>
        {this.state.tweets.map((tweet) => (
          <div key={tweet._id}>
            <SingleTweet
              tweet={tweet}
              inUserProfile={this.props.inUserProfile}
              inMyProfile={this.props.inMyProfile}
            />
          </div>
        ))}
      </div>
    );
  }
}
