import axios from "axios";

export async function getAllUsers() {
  try {
    const response = await axios.get("http://localhost:3000/users/all");
    const users = response.data;
    return users;
  } catch (error) {
    return error;
  }
}

export async function getAllTweets() {
  try {
    const response = await axios.get(`http://localhost:3000/tweets/all`);
    const tweetDocs = response.data;
    return tweetDocs;
  } catch (error) {
    return error;
  }
}

export async function getUserTweets(userId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/tweets/userTweets/` + userId
    );
    const tweets = response.data;
    return tweets;
  } catch (error) {
    return error;
  }
}

export async function getSingleUser(userId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/users/singleUser/` + userId
    );
    const user = response.data;
    return user;
  } catch (error) {
    return error;
  }
}

export async function getUserTwe(userId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/tweets/userTweets/` + userId
    );
    const tweetDocs = response.data;
    return tweetDocs;
  } catch (error) {
    return error;
  }
}

export async function getUserTwee(userId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/tweets/userTweets/` + userId
    );
    const tweetDocs = response.data;
    return tweetDocs;
  } catch (error) {
    return error;
  }
}

export async function likeTweet(tweetId, token) {
  if (token !== "") {
    try {
      const response = await axios.post(
        "http://localhost:3000/tweets/likeTweet/" + tweetId,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response)
      return response.data;
    } catch (error) {
      console.log("Tweet like/unlike failed:", error);
    }
  }
  else{
    return "Not logged in"
  }
}

export async function deleteTweet(tweetId, token) {
  try {
    const response = await axios.get(
      "http://localhost:3000/tweets/del/" + tweetId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    alert("Deleting tweet..");
    window.location.reload();
  } catch (error) {
    console.log("Tweet deletion failed:", error);
  }
}
