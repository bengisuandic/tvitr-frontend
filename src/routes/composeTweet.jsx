import React from "react";
import axios from "axios";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";

function handleSubmit(data) {
  try {
    axios.post("http://localhost:3000/tweets/tweetAt", data).then((res) => {
    const composeRes = res;
    });
    console.log("handlesubmit", data);
  } catch (error) {
    console.log(error)
  }
}

export default function NewTweet() {
  const [data, setData] = useState("");

  return (
    <div style={{ margin: "10%" }}>
      <div>
        <FormControl style={{ width: "70%" }}>
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
      <p>{data}</p>
      <div style={{ margin: "10%" }}>
        <Button onClick={() => handleSubmit({ data })} variant="outlined">
          Publish
        </Button>
      </div>
    </div>
  );
}
