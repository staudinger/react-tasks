import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyCqnN2nMRTB8YhJiyVJVZLTM6vmWtcAl_w",
  authDomain: "my-tasks-8b602.firebaseapp.com",
  databaseURL: "https://my-tasks-8b602.firebaseio.com",
  projectId: "my-tasks-8b602",
  storageBucket: "my-tasks-8b602.appspot.com",
  messagingSenderId: "222342933506",
  appId: "1:222342933506:web:8b1bfbcb4a5d3da0f28b1b",
  measurementId: "G-WXMCGEQ8FG",
};
firebase.initializeApp(config);

//redux store
const store = configureStore();
render(
  //making store visible to the app
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
