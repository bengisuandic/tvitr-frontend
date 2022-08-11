import React from "react";
import MyUser from "../components/ProfileUser";
import { Button, Fab} from "@mui/material";
import { Link } from "react-router-dom";
import { blue } from "@mui/material/colors";

const style = {
  background: "rgb(29, 107, 197)",
  color: "aliceblue",
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

export default function User() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <MyUser />
      <Link to={"/newTweet"}>
        <Fab variant="extended" style={style}>Compose</Fab>
      </Link>
    </main>
  );
}
