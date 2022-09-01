import React from "react";
import "../styles/cards.css";

import { likeTweet, deleteTweet } from "../API/api";
import { store } from "../Store/store";
import { Link } from "react-router-dom";
import { pink } from "@mui/material/colors";
import { IconButton, Tooltip, Box } from "@mui/material";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default class SingleTweet extends React.Component {
  constructor() {
    super();
    this.store = store.getState();
  }

  state = {
    tweet: {
      likes: [],

      user: {
        _id: "",
      },
    },
  };

  componentDidMount() {
    const tweet = this.props.tweet;
    this.setState({ tweet });
  }

  render() {
    return (
      <div>
        <Card variant="outlined" sx={{ margin: "2% 8%" }}>
          <CardContent>
            <Typography>{this.state.tweet.data}</Typography>
          </CardContent>
          <CardActions className="tweet-card-bottom">
            {this.props.inUserProfile !== "1" ? (
              <Link to={{ pathname: `/users/${this.state.tweet.user._id}` }}>
                <Tooltip title="Go to user">
                  <Typography color="primary" className="tweet-card-user-info">
                    <Box
                      component="img"
                      className="tweet-picture-box"
                      alt="User profile picture"
                      src={this.state.tweet.user._img}
                    />
                    <p>{this.state.tweet.user.username}</p>
                  </Typography>
                </Tooltip>
              </Link>
            ) : (
              <p></p>
            )}

            <div>
              <Tooltip
                title={
                  this.state.tweet.likes.length > 0
                    ? this.state.tweet.likes.map((like) => (
                        <div
                          key={this.state.tweet.likes.findIndex(
                            (e) => e === like
                          )}
                        >
                          {like.username}
                        </div>
                      ))
                    : "No likes"
                }
              >
                <span>{this.state.tweet.likes.length} likes</span>
              </Tooltip>
              {this.props.inMyProfile !== "1" ? (
                <Tooltip
                  title={
                    this.store.tokenReducer === ""
                      ? "You need to log in!"
                      : this.props.tweet.likes.findIndex(
                          (el) => el._id === this.props.userId
                        ) === -1
                      ? "Like"
                      : "Dislike"
                  }
                >
                  <IconButton
                    onClick={async () => {
                      if (this.store.tokenReducer !== "") {
                        let newList = await likeTweet(
                          this.state.tweet._id,
                          this.store.tokenReducer
                        );
                        this.setState({ tweet: newList });
                      }
                    }}
                  >
                    {this.props.tweet.likes.findIndex(
                      (el) => el._id === this.store.userReducer._id
                    ) === -1 ? (
                      <HeartBrokenIcon sx={{ color: pink[300] }} />
                    ) : (
                      <FavoriteIcon sx={{ color: pink[500] }} />
                    )}
                  </IconButton>
                </Tooltip>
              ) : (
                <></>
              )}

              {this.props.inMyProfile === "1" ? (
                <Tooltip title="Delete this tweet">
                  <IconButton
                    onClick={async () => {
                      let newList = await deleteTweet(
                        this.props.tweet._id,
                        this.store.tokenReducer
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <></>
              )}
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}
