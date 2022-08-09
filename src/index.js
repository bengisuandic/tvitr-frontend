import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

import Users from "./routes/users";
import Tweets from "./routes/tweets";
import Home from "./routes/homePage"
import User from "./routes/userProfile";
import SingleUserComp from "./routes/singleUser";
import NewTweet from "./routes/composeTweet";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* Strict mode hataları kontrol edip duzgun kod yazmaya zorluyor. Sistemi kapatıyor hata bulunca */}
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home/>}/>
            <Route path="users" element={<Users />} />
            <Route path="tweets" element={<Tweets />} />
            <Route path="myProfile" element={<User />} />
            <Route path="newTweet" element={<NewTweet />} />
            <Route path="users/:userId" element={<SingleUserComp />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
