import React from "react";
import axios from "axios";
import "../styles/tweetCard.css";

import { Link } from "react-router-dom";
import { purple } from "@mui/material/colors";
import { IconButton, Tooltip } from "@mui/material";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

async function deleteTweet(tweetId, token) {
  try {
    console.log(token);
    return axios
      .get("http://localhost:3000/tweets/del/" + tweetId, {
        headers: {
          Authorization: "Bearer " + token,
        }
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
      .post("http://localhost:3000/tweets/likeTweet/" + tweetId, {} , {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
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
  state = {
    tweets: [],
  };

  componentDidMount() {
    if (this.props.inMyProfile === "1") {
      //localden fln biyerden çek
      console.log("my profile");
      axios
        .get(`http://localhost:3000/tweets/userTweets/` + this.props.userId)
        .then((res) => {
          const tweets = res.data;
          console.log("Axios tweets:", tweets);
          this.setState({ tweets });
        });
    } else if (this.props.inUserProfile === "1") {
      console.log("another profile");
      axios
        .get("http://localhost:3000/tweets/userTweets/" + this.props.userId)
        .then((res) => {
          const tweets = res.data;
          console.log("Axios tweets:", tweets);
          this.setState({ tweets });
        });
    } else {
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
        {this.state.tweets.map((tweet) => (
          <Card key={tweet._id} variant="outlined" sx={{ margin: "2% 8%" }}>
            <CardContent styles={{ margin: "10px 0 0 0" }}>
              <Typography>{tweet.data}</Typography>
            </CardContent>
            <CardActions
              className="tweet-card-bottom"
              styles={{ margin: "0px 0px 0px 10%" }}
            >
              {this.props.inUserProfile !== "1" ? (
                <Link to={{ pathname: `/users/${tweet.user._id}` }}>
                  <Tooltip title="Go to user">
                    <Typography color={purple[400]}>
                      By {tweet.user.name}
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
                    tweet.likes.findIndex((el) => el === this.props.userId) === -1
                      ? "Like"
                      : "Dislike"
                  }
                >
                  <IconButton
                    onClick={async () => {
                      let newList = await likeTweet(
                        tweet._id,
                        this.state.tweets,
                        this.props.token
                      );
                      this.setState({ tweets: newList });
                    }}
                  >
                    {tweet.likes.findIndex((el) => el === this.props.userId) === -1 ? (
                      <HeartBrokenIcon />
                    ) : (
                      <FavoriteIcon />
                    )}
                  </IconButton>
                </Tooltip>

                {this.props.inMyProfile === "1" ? (
                  <Tooltip title="Delete this tweet">
                    <IconButton
                      onClick={async () => {
                        let newList = await deleteTweet(
                          tweet._id,
                          this.props.token
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
