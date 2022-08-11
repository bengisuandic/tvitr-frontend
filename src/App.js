import React from "react";
import { Outlet, Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Link to={"/"}><button>Home</button></Link>
          <Link to={"/users"}><button>All Users</button></Link>
          <Link to={"/tweets"}><button>All Tweets</button></Link>
          <Link to={"/myProfile"}><button><AccountBoxIcon fontSize="large"/></button></Link>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
