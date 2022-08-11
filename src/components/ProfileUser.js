import React from "react";
import axios from "axios";
import TweetList from "./TweetList";

var userId = "62eb67e72243ec803a341a67";

export default class MyUser extends React.Component {
    state = {
      user: {},
    };

    componentDidMount(){
        axios.get("http://localhost:3000/users/" + userId).then((res) => {
            const user = res.data;
            this.setState({ user });
        });
    };

    render(){
        return(
            <div>
                <h3>Hello, {this.state.user.name}</h3>
                <h4>Your user id: {this.state.user._id}</h4>
                <h2>{this.state.user.tweetCount}</h2>{console.log("hmmm", this.state.user.tweets)}
                {/* <TweetList tweets={this.state.user.tweets} inUserProfile="1" /> */}
                {/* <p>{this.state.user.tweets.length}</p> */}
            </div>

        );
    }

};