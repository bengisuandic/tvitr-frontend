import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { freeToken, freeUser } from "../app/actions";

function handleLogout(dispatch) {
  dispatch(freeToken());
  dispatch(freeUser());
}

export default function Logout() {
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        onClick={() => handleLogout(dispatch)}
        style={{ color: "rgb(250 0 0)" }}
      >
        {" "}
        LogOut{" "}
      </Button>
    </div>
  );
}
