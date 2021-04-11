import React, { Suspense } from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "./App.css";
import Header from "./components/Header";
import PostButton from "./components/PostButton";
import SignIn from "./components/SignIn";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ImageUpload from "./components/ImageUpload";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Feed from "./components/Feeds";

const UserProfile = React.lazy(() => import("./components/UserProfile"));

const store = configureStore();

let persistor = persistStore(store);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Header />
            <Switch>
              <Route path="/upload">
                <ImageUpload />
              </Route>
              <Route path="/posts">
                <Suspense fallback={<div>Loading...</div>}>
                  <UserProfile />
                </Suspense>
                <PostButton />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/feed">
                <PostButton/>
                <Feed />
              </Route>
              <Route path="/">
                <Home />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
