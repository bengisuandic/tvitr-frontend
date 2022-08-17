import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { tokenReducer, userReducer } from "./reducers"

// const tokenSlice = createSlice({
//   name: 'userToken',
//   initialState: {
//     userToken: ""
//   },
//   reducers: {
//     setToken: (state, action) => {
//       console.log("setToken:", action.payload);
//       state.userToken = action.payload;
//     }
//   }
// })
// export const { setToken } = tokenSlice.actions

const reducers = combineReducers({
  tokenReducer : tokenReducer,
  userReducer : userReducer
})

export const store = configureStore({
  reducer: reducers
});
