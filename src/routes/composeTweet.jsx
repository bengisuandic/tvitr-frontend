import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";

export default function NewTweet() {
  return (
    <div style={{ margin: "10%" }}>
      <div>
        <FormControl  style={{ width: '70%' }}>
          <InputLabel htmlFor="my-input">Write stuff here</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">Shakespeare much?</FormHelperText>
        </FormControl>
      </div>
      <div style={{ margin: "10%" }}>
        <Button variant="outlined">Publish</Button>
      </div>
    </div>
  );
}
