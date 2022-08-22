import React from "react";
import axios from "axios";
import "../styles/cards.css";

import { store } from "../app/store";
import { Link } from "react-router-dom";
import { purple, pink, blue } from "@mui/material/colors";
import { IconButton, Tooltip, Box } from "@mui/material";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Okay so, I know this one is pretty complicated for a single component.
// However, it would not make such a difference if I seperate different tweet
// lists or a make single tweet card component. Maybe it would? Idk but this
// seems like the most convenient for me to code...

async function deleteTweet(tweetId, token) {
  try {
    console.log(token);
    return axios
      .get("http://localhost:3000/tweets/del/" + tweetId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("Delete succeed:", res);
        let tweets = res.data;
        return tweets;
      });
  } catch (error) {
    console.log("Tweet deletion failed:", error);
  }
}

async function likeTweet(tweetId, t, token) {
  try {
    console.log(token);
    return axios
      .post(
        "http://localhost:3000/tweets/likeTweet/" + tweetId,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log("Like/unlike succeed:", res);
        let tweets = [...t];
        let ts = tweets.findIndex((el) => el._id === res.data._id);
        tweets[ts] = res.data;

        console.log(ts);
        return tweets;
      });
  } catch (error) {
    console.log("Tweet like/unlike failed:", error);
  }
}

export default class TweetList extends React.Component {
  constructor() {
    super();
    this.store = store.getState();
  }

  state = {
    tweets: [],
  };

  componentDidMount() {
    if (this.props.inUserProfile === "1") {
      console.log("my profile");
      axios
        .get(`http://localhost:3000/tweets/userTweets/` + this.props.userId)
        .then((res) => {
          const tweets = res.data;
          console.log("Axios tweets:", tweets);
          this.setState({ tweets });
        });
    }

    //else if (this.props.inUserProfile === "1") {
    //   console.log("another profile");
    //   console.log("props:", this.props);
    //   axios
    //     .get("http://localhost:3000/tweets/userTweets/" + this.props.userId)
    //     .then((res) => {
    //       console.log(res);

    //       const tweets = res.data;
    //       console.log("Axios tweets:", tweets);
    //       this.setState({ tweets });
    //     });
    // }
    else {
      console.log("all tweets");
      axios.get(`http://localhost:3000/tweets/all`).then((res) => {
        const tweets = res.data;
        this.setState({ tweets });
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.tweets
          .slice(0)
          .reverse()
          .map((tweet) => (
            <Card key={tweet._id} variant="outlined" sx={{ margin: "2% 8%" }}>
              <CardContent styles={{ margin: "10px 0 0 0" }}>
                <Typography>{tweet.data}</Typography>
              </CardContent>
              <CardActions
                className="tweet-card-bottom"
                styles={{ margin: "0px 0px 0px 10%" }}
              >
                {this.props.inUserProfile !== "1" ? (
                  <Link to={{ pathname: `/users/${tweet.user._id}` }} >
                    <Tooltip title="Go to user">
                      <Typography color="primary" className="tweet-card-user-info">
                        <Box
                          component="img"
                          className="tweet-picture-box"
                          alt="User profile picture"
                          src={tweet.user._img}
                        />
                        <p>{tweet.user.username}</p>
                      </Typography>
                    </Tooltip>
                  </Link>
                ) : (
                  <p></p>
                )}

                <div>
                  <span>{tweet.likes.length} likes</span>
                  <Tooltip
                    title={
                      this.store.tokenReducer === ""
                        ? "You need to log in!"
                        : tweet.likes.findIndex(
                            (el) => el === this.props.userId
                          ) === -1
                        ? "Like"
                        : "Dislike"
                    }
                  >
                    <IconButton
                      onClick={async () => {
                        let newList = await likeTweet(
                          tweet._id,
                          this.state.tweets,
                          this.store.tokenReducer
                        );
                        this.setState({ tweets: newList });
                      }}
                    >
                      {tweet.likes.findIndex(
                        (el) => el === this.store.userReducer._id
                      ) === -1 ? (
                        <HeartBrokenIcon sx={{ color: pink[300] }} />
                      ) : (
                        <FavoriteIcon sx={{ color: pink[500] }} />
                      )}
                    </IconButton>
                  </Tooltip>

                  {this.props.inMyProfile === "1" ? (
                    <Tooltip title="Delete this tweet">
                      <IconButton
                        onClick={async () => {
                          let newList = await deleteTweet(
                            tweet._id,
                            this.store.tokenReducer
                          );
                          this.setState({ tweets: newList });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <p></p>
                  )}
                </div>
              </CardActions>
            </Card>
          ))}
      </div>
    );
  }
}
