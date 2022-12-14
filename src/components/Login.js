import React from "react";
import axios from "axios";
import { store } from "../Store/store";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../Store/actions";
import {
  FormControl,
  InputLabel,
  Input,
  Button
} from "@mui/material";
import "../styles/cards.css";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   display: "flex",
//   flexDirection: "column",
//   alignContent: "center",
//   p: 4,
// }

async function handleSubmit(data, dispatch) {
  try {
    if (data.data !== "") {
      return axios
        .post("http://localhost:3000/users/login", data)
        .then((res) => {
          console.log("Login Response:", res);
          const composeRes = res;
          if (res.status === 200) {
            //console.log(composeRes.data.token);
            dispatch(setToken(composeRes.data.token));
            dispatch(setUser(composeRes.data.user));
            //console.log("Store?", store.getState());
          }
        })
        .catch((error) => alert(error.response.data));
    } else {
      throw Error("Bruh");
    }
  } catch (error) {
    alert(error.response.data);
  }
}

export default function Login() {
  const dispatch = useDispatch();

  var [username, setData] = useState("");
  var [password, setData1] = useState("");

  const [openAlert, setOpenAlert] = useState(false);
  const handleOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const alertMsg = "Nothing yet";

  return (
    <div style={{ margin: "5% 10% 5%" }}>
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
              onChange={(e) => setData(e.target.value)}
            />
          </FormControl>
        </div>

        <div style={{ margin: "5% 10% 5%" }} className="signin-form">
          <FormControl
            style={{ width: "70%" }}
            className="signin-form"
            required
          >
            <InputLabel htmlFor="my-password">Password</InputLabel>
            <Input
              id="my-password"
              aria-describedby="my-helper-text"
              type="password"
              required
              value={password}
              onChange={(e) => setData1(e.target.value)}
            />
          </FormControl>
        </div>
      </div>
      <div style={{ margin: "10px" }}>
        {username !== "" ? (
          <Button
            className="submit-button"
            onClick={() => {
              handleSubmit({ username, password }, dispatch, handleOpenAlert);
            }}
            variant="contained"
          >
            Login
          </Button>
        ) : (
          <p style={{ color: "rgb(255, 57, 43, 0.72)" }}></p>
        )}
      </div>
      <Link to={"/signUp"}>
        {" "}
        <Button> Don't have an account? Sign up!</Button>
      </Link>
      {/* <Stack spacing={2}>
        <Alert severity="error" open={openAlert} onClose={handleCloseAlert}>
          <AlertTitle> Error </AlertTitle>
          {alertMsg}
        </Alert>
      </Stack> */}
    </div>
  );
}
