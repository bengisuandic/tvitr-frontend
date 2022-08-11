import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/tweetCard.css";
import { IconButton, Tooltip } from "@mui/material";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";

//delete tweet req: "http://localhost:3000/users/del/62eb6c472243ec803a341a6d"

export default class TweetList extends React.Component {
  state = {
    tweets: [],
  };

  componentDidMount() {
    
    if (this.props.inUserProfile === "1"){
      console.log(this.props.tweets)
      console.log("hello??")
      const tweets = this.props.tweets;
      this.setState({ tweets });
    } else{
      console.log("axios");
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
              <Link to={{ pathname: `/users/${tweet.user._id}` }}>
                <Typography color={purple[400]}>
                  By {tweet.user.name}
                </Typography>
              </Link>
              <Tooltip title="Like this tweet">
                <IconButton>
                  <HeartBrokenIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}
