import React from "react";
import axios from "axios";

var userId = "62ea6bd11650b12aa0ef43d1";

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
            </div>
        );
    }

};