import React from "react";
import axios from "axios";
import '../styles/tweetCard.css'
import { IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";

export default class PersonList extends React.Component {
  state = {
    tweets: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/tweets/all`).then((res) => {
      const tweets = res.data;
      this.setState({ tweets });
    });
  }

  render() {
    return (
      <div>
        {this.state.tweets.map((tweet) => (
          <Card key={tweet._id} variant="outlined" sx={{ margin: "2% 8%" }}>
            <CardContent styles={{margin: "10px 0 0 0"}}>
              <Typography>{tweet.data}</Typography>
            </CardContent>
            <CardActions className="tweet-card-bottom" styles={{margin: "0px 0px 0px 10%"}}>
            <Typography color={purple[400]}>By {tweet.user.name}</Typography>
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
