import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskList = ({ tasks, sortBy, onDeleteClick }) => {
  switch (sortBy) {
    case "none":
      break;
    case "dueDate":
      tasks.sort((a, b) => {
        // a = tasks[0], b = tasks[1]
        // tasks[0] = {...}
        // a.due = '05/03/2020'
        const firstDate = new Date(a.due);
        const secondDate = new Date(b.due);
        if (firstDate.getTime() < secondDate.getTime()) return -1;
        if (firstDate.getTime() > secondDate.getTime()) return 1;
        return 0;
      });
      break;
    case "importance":
      tasks.sort((a, b) => {
        if (
          a.importance === "High" ||
          (a.importance === "Medium" && b.importance !== "High")
        ) {
          return -1;
        } else {
          return 1;
        }
      });
      break;
    case "smartSort":
      tasks.sort((a, b) => {
        // a = tasks[0], b = tasks[1]
        // tasks[0] = {...}
        // a.due = '05/03/2020'
        const firstDate = new Date(a.due);
        const secondDate = new Date(b.due);
        if (firstDate.getTime() < secondDate.getTime()) return -1;
        if (firstDate.getTime() > secondDate.getTime()) return 1;
        if (firstDate.getTime() === secondDate.getTime()) {
          if (
            a.importance === "High" ||
            (a.importance === "Medium" && b.importance !== "High")
          ) {
            return -1;
          } else {
            return 1;
          }
        }
      });
      break;
    default:
      break;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Task</th>
          <th>Due</th>
          <th>Importance</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => {
          return (
            <tr key={task.id}>
              <td>
                <Link to={"/task/" + task.title}>{task.title}</Link>
              </td>
              <td>{task.due}</td>
              <td>{task.importance}</td>
              <td>{task.category}</td>
              <td>
                <ToastContainer />

                <button
                  className="btn btn-success"
                  onClick={() => onDeleteClick(task)}
                >
                  Done
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default TaskList;
