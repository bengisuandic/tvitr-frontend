import React from "react";
import axios from "axios";
import { useState } from "react";
import { store } from "../app/store";
import { Link } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Modal,
  Fade,
  Typography,
  Backdrop,
  Box,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  p: 4,
};
async function handleSubmit(data) {
  try {
    if (data.data !== "") {
      console.log(data);
      return axios
        .post("http://localhost:3000/users/signup", data)
        .then((res) => {
          const composeRes = res;
          console.log("Login Response:", res);
        });
    } else {
      throw Error("Bruh");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function Login() {
  var [username, setDataUN] = useState("");
  var [password, setDataP] = useState("");
  var [name, setDataN] = useState("");
  var [age, setDataA] = useState("");

  return (
    <div style={{ margin: "10%" }}>
      <div>
        <div style={{ margin: "10%" }}>
          <FormControl style={{ width: "70%" }} required>
            <InputLabel htmlFor="my-username">Username</InputLabel>
            <Input
              id="my-username"
              aria-describedby="my-helper-text"
              type="text"
              required
              value={username}
              onChange={(e) => setDataUN(e.target.value)}
            />
          </FormControl>
        </div>

        <div style={{ margin: "10%" }}>
          <FormControl style={{ width: "70%" }} required>
            <InputLabel htmlFor="my-password">Password</InputLabel>
            <Input
              id="my-password"
              aria-describedby="my-helper-text"
              type="password"
              required
              value={password}
              onChange={(e) => setDataP(e.target.value)}
            />
          </FormControl>
        </div>
        <div style={{ margin: "10%" }}>
          <FormControl style={{ width: "70%" }} required>
            <InputLabel htmlFor="my-name">Name</InputLabel>
            <Input
              id="my-name"
              aria-describedby="my-helper-text"
              type="text"
              required
              value={name}
              onChange={(e) => setDataN(e.target.value)}
            />
          </FormControl>
        </div>
        <div style={{ margin: "10%" }}>
          <FormControl style={{ width: "70%" }} required>
            <InputLabel htmlFor="my-age">Age</InputLabel>
            <Input
              id="my-age"
              aria-describedby="my-helper-text"
              type=""
              required
              value={age}
              onChange={(e) => setDataA(e.target.value)}
            />
          </FormControl>
        </div>
      </div>
      <div style={{ margin: "10%" }}>
        {username !== "" ? (
          <Button
            onClick={() => {
              handleSubmit({ username, password, name, age });
            }}
            variant="contained"
          >
            Sign Up!
          </Button>
        ) : (
          <p style={{ color: "rgb(255, 57, 43, 0.72)" }}>
            Please write something..
          </p>
        )}
      </div>
    </div>
  );
}
