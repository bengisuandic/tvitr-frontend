import React from "react";
import MyUser from "../components/ProfileUser";
import Login from "../components/Login";
//import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function User() {
  const state = useSelector((state) => state);
  const myUser = state.userReducer;
  const myToken = state.tokenReducer;
  //console.log("MYUser:", myUser);

  return (
    <main style={{ padding: "1rem 0" }}>
      {myToken === "" ?
      (<Login />):(<MyUser userId={myUser._id} token={myToken}/>)}
    </main>
  );
}
