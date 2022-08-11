import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@mui/material";

export default class PersonList extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/users/all`).then((res) => {
      const users = res.data;
      this.setState({ users });
    });
  }

  render() {
    return (
      <div>
        {this.state.users.map((user) => (
          <Link to={{ pathname: `/users/${user._id}` }}>
            <Card key={user._id} variant="outlined" sx={{ margin: "2% 8%" }}>
              <CardContent>{user.name}</CardContent>
              {user.tweets.length > 0 ? (
                <CardContent>{user.tweets.length} tweets</CardContent>
              ) : (
                <CardContent>No tweets</CardContent>
              )}
            </Card>
          </Link>
        ))}
      </div>
    );
  }
}
