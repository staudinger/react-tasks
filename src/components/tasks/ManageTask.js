import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTasks } from "../../redux/actions/taskActions";
import { saveTask } from "../../redux/actions/taskActions";
import PropTypes from "prop-types";
import TaskForm from "./TaskForm";
import { newTask } from "../../tools/mockData";

function ManageTask({ tasks, loadTasks, history, saveTask, ...props }) {
  //new state variable task, is set to a copy of props.task
  const [task, setTask] = useState({ ...props.task });

  const [dueDate, setDueDate] = useState(new Date());

  const [errors, setErrors] = useState({});
  //use effect happens after a render
  useEffect(() => {
    if (tasks.length === 0) {
      loadTasks().catch(error => {
        alert("Loading tasks Failed " + error);
      });
    } else {
      setTask({ ...props.task });
    }
    //skips effect if array below is equal to ...props.task
  }, [props.task]);

  function handleChange(event) {
    const { name, value } = event.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  }

  function handleDateChange(date) {
    setDueDate(date);
    const dateFormat = new Date(date);
    const month = `0${dateFormat.getMonth() + 1}`.slice(-2);
    const year = dateFormat.getFullYear();
    const day = `0${dateFormat.getDate()}`.slice(-2);

    setTask(prevTask => ({
      ...prevTask,
      due: `${month}/${day}/${year}`
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveTask(task).then(() => {
      history.push("/");
    });
  }

  return (
    <TaskForm
      task={task}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      onDateChange={handleDateChange}
      dueDate={dueDate}
    />
  );
}
ManageTask.propTypes = {
  task: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  loadTasks: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getTaskByTitle(tasks, title) {
  return tasks.find(task => task.title === title) || null;
}

function mapStateToProps(state, ownProps) {
  const title = ownProps.match.params.title;
  const task =
    title && state.tasks.length > 0
      ? getTaskByTitle(state.tasks, title)
      : newTask;
  return {
    tasks: state.tasks,
    task
  };
}

const mapDispatchToProps = {
  loadTasks,
  saveTask
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTask);
