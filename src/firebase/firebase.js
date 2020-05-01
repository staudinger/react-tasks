import React, { createContext, useEffect } from "react";
import firebaseConfig from "./firebaseConfig";
import app from "firebase/app";
import "firebase/database";
import { useDispatch } from "react-redux";

import { taskActions } from "../redux/actions/taskActions";

// we create a React Context, for this to be accessible
// from a component later
const FirebaseContext = createContext(null);
export { FirebaseContext };

export default ({ children }) => {
  let firebase = {
    app: null,
    database: null,
  };

  const dispatch = useDispatch();

  // check if firebase app has been initialized previously
  // if not, initialize with the config we saved earlier
  if (!app.apps.length) {
    app.initializeApp(firebaseConfig);
    firebase = {
      app: app,
      database: app.database(),

      api: {
        getTasks,
      },
    };
  }

  // function to query Tasks from the database and
  // fire a Redux action to update the items in real-time
  function getTasks() {
    firebase.database.ref("tasks").on("value", (snapshot) => {
      const vals = snapshot.val();
      let _records = [];
      for (var key in vals) {
        _records.push({
          ...vals[key],
          id: key,
        });
      }
      // setTasks is a Redux action that would update the todo store
      // to the _records payload
      //   dispatch(saveTask(_records));
    });
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};
