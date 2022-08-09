import React from "react";
import axios from "axios";

export default class SingleUserJS extends React.Component {
    state = {
      user: {},
    };
    
    componentDidMount(){
        axios.get("http://localhost:3000/users/" + this.props.userId).then((res) => {
            const user = res.data;
            this.setState({ user });
        });
    };

    render(){
        return(
            <div>
                <h3>{this.state.user.name}'s Page</h3>
                <h4>Their user id: {this.state.user._id}</h4>
                <p>{ this.state.user.tweets}</p>
            </div>
        );
    }

};