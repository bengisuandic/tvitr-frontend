import React from "react";
import SingleUserJS from "../components/SingleUser.js";
import { useParams } from "react-router-dom";

export default function SingleUserComp() {
    const params = useParams();
    var userId = params.userId;
    console.log("The user visited:", userId);
    return (
    <main style={{ padding: "1rem 0" }}>
      <SingleUserJS userId={userId}/>
    </main>
  );
}
