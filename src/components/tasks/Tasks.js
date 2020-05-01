import React from "react";
import { connect } from "react-redux";
import * as taskActions from "../../redux/actions/taskActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import TaskList from "./TaskList";
import { Redirect } from "react-router-dom";
import SelectInput from "../common/SelectInput";
import { toast } from "react-toastify";

const sortByOptions = [
  {
    option: "Due Date",
    value: "dueDate",
  },
  {
    option: "Task Name",
    value: "taskName",
  },
  {
    option: "Importance",
    value: "importance",
  },
  {
    option: "Alberts Smart Sort",
    value: "smartSort",
  },
];

class Tasks extends React.Component {
  state = {
    redirectToAddTaskPage: false,
    task: {
      title: "",
    },
    sortBy: "none",
  };
  componentDidMount() {
    this.props.actions.loadTasks().catch((error) => {
      alert("Loading Tasks failed " + error);
    });
  }

  handleChange = (event) => {
    //what's happening here?
    const task = { ...this.state.task, title: event.target.value };
    this.setState({ task: task });
  };

  handleSortChange = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.createTask(this.state.task);
    alert(this.state.task.title);
  };
  handleDeleteTask = (task) => {
    toast.success(task.title + " Done");
    this.props.actions.deleteTask(task);
  };
  render() {
    return (
      <>
        {this.state.redirectToAddTaskPage && <Redirect to="/task" />}
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-task"
          onClick={() => this.setState({ redirectToAddTaskPage: true })}
        >
          Add Task
        </button>
        <SelectInput
          name="sortBu"
          label="Sort By:"
          value={this.state.sortBy || "none"}
          defaultOption="None"
          options={sortByOptions.map((sortOption) => ({
            value: sortOption.value,
            text: sortOption.option,
          }))}
          onChange={this.handleSortChange}
        />
        {/* what's this.props.tasks ? */}
        <TaskList
          tasks={this.props.tasks}
          sortBy={this.state.sortBy}
          onDeleteClick={this.handleDeleteTask}
        />
      </>
    );
  }
}
Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTasks: bindActionCreators(taskActions.loadTasks, dispatch),
      deleteTask: bindActionCreators(taskActions.deleteTask, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
