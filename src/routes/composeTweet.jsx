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

async function handleSubmit(data, token, resp) {
  try {
    if (data.data !== "") {
      return axios
        .post("http://localhost:3000/tweets/tweetAt", data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          const composeRes = res;
          console.log("handlesubmit", data);
          console.log("Compose Response:", res);
          if(res.status === 200){
            resp = 1;
            return resp = 1;
          }
          console.log(resp);
        });
    } else {
      throw Error("Cannot be empty");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function NewTweet() {
  var [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  var resp = 0;
  const state = store.getState();

  return (
    <div style={{ margin: "10%" }}>
      <div>
        <FormControl style={{ width: "70%" }} required>
          <InputLabel htmlFor="my-input">Write stuff here</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="text"
            required
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <FormHelperText id="my-helper-text">Shakespeare much?</FormHelperText>
        </FormControl>
      </div>
      <div style={{ margin: "10%" }}>
        {data !== "" ? (
          <Button
            onClick={async () => {
              resp = await handleSubmit({ data }, state.tokenReducer, resp);
              console.log(resp);
              if(resp !== 0){ handleOpen();}
            }}
            variant="contained"
          >
            Publish
          </Button>
        ) : (
          <p style={{ color: "rgb(255, 57, 43, 0.72)" }}>
            Please write something..
          </p>
        )}
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
              Just Tweeted!
              </Typography>
              <Link to={"/myProfile"}>
                <Button style={{ width: "50%" }} variant="contained">
                  Go to your profile
                </Button>
              </Link>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
