import React from "react";
import { Link } from "react-router-dom";
import Tasks from "../tasks/Tasks";

const HomePage = () => (
  <div className="jumbotron">
    <h1>What should I do first?</h1>
    <Tasks />
  </div>
);

export default HomePage;
