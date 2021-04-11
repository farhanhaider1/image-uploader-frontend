import { combineReducers } from "redux";
// import entitiesReducer from "./entities";

import userReducer from "./user";

// reducers combined under entities
export default combineReducers({
  // entities: entitiesReducer,
  users: userReducer,
});
