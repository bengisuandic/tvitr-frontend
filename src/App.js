import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fab } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import "./styles/App.css";

const style = {
  background: "rgb(0, 46, 98)",
  color: "white",
  margin: 0,
  top: "auto",
  right: "8%",
  bottom: "4.5%",
  left: "auto",
  position: "fixed",
};

function App() {
  const state = useSelector((state) => state);

  return (
    <div className="App">
      <header className="App-header">
        <Link to={"/"}>
          <button>Home</button>
        </Link>
        <Link to={"/users"}>
          <button>Users</button>
        </Link>
        <Link to={"/tweets"}>
          <button>Tweets</button>
        </Link>
        <Link to={"/myProfile"}>
          <button>
            <AccountBoxIcon fontSize="large" />
          </button>
        </Link>
      </header>
      {state.tokenReducer !== "" ? (
        <Link
          to={{ pathname: "/newTweet", state: { token: state.tokenReducer } }}
        >
          <Fab draggable variant="extended" style={style}>
            <CreateOutlinedIcon />
            Compose
          </Fab>
        </Link>
      ) : (
        <p></p>
      )}
      <Outlet />
    </div>
  );
}

export default App;
