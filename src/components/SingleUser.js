import React from "react";
import axios from "axios";
import TweetList from "../components/TweetList";
import { Box, Card, CardActions, Button } from "@mui/material";
import { store } from "../Store/store.js";
import { getUserTweets, getSingleUser } from "../API/api";
import "../styles/cards.css";

async function followUser(token, userId, user) {
  try {
    return axios
      .get("http://localhost:3000/users/handleFollow/" + userId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        const updateUser = res.data.object;
        // let flw = [...user.followers]
        // flw = updateUser.followers;
        return updateUser;
      })
      .catch((err) => console.log("Error occured:", err));
  } catch (error) {
    console.log("TryCatch err:", error);
  }
}

export default class SingleUserJS extends React.Component {
  constructor() {
    super();
    this.store = store.getState();
  }
  state = {
    user: {
      tweets: [],
      followers: [],
      following: [],
    },
    funf: "as"
  };

  async componentDidMount() {
    const user = await getSingleUser(this.props.userId);
    this.setState({ user });
    const tweets = await getUserTweets(this.props.userId);
    this.setState({ tweets });

    if (
      this.state.user.followers.findIndex(
        (el) => el === this.store.userReducer._id
      ) !== -1
    ) {
      this.setState({funf: "Unfollow"})
    } else {
      this.setState({funf: "Follow"})
    }
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
            <div>@{this.state.user.username}</div>
            <div>{this.state.user.followers.length} followers</div>
            <div>{this.state.user.following.length} following</div>
            {}
            {this.store.tokenReducer !== "" ? (
              <Button
                onClick={async () => {
                  let resp = await followUser(
                    this.store.tokenReducer,
                    this.state.user._id,
                    this.state.user
                  );
                  console.log("Mysatate:", this.state)
                  this.setState({ user: resp });
                  // if(this.state.user.followers.findIndex(el => el._id === this.store.userReducer._id) !== -1){
                  //   funf = "Unfollow";
                  // }
                }}
              >
                {this.state.funf}
              </Button>
            ) : (
              <div></div>
            )}
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
