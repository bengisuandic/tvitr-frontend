import React from "react";
import MyUser from "../components/ProfileUser";
import { Button} from "@mui/material";
import { Link } from "react-router-dom";

export default function User() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <MyUser />
      <Link to={"/newTweet"}>
        <Button variant="contained">Compose</Button>
      </Link>
    </main>
  );
}
