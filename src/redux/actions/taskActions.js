import * as types from "./actionTypes";
import * as taskApi from "../../api/taskApi";

export function loadTaskSuccess(tasks) {
  return { type: types.LOAD_TASKS_SUCCESS, tasks };
}

export function createTaskSuccess(task) {
  return { type: types.CREATE_TASK_SUCCESS, task };
}

export function updateTaskSuccess(task) {
  return { type: types.UPDATE_TASK_SUCCESS, task };
}

export function deleteTaskOptimistic(task) {
  return { type: types.DELETE_TASK_OPTIMISTIC, task };
}
//this is a thunk
export function loadTasks() {
  return function (dispatch) {
    return taskApi
      .getTasks()
      .then((tasks) => {
        dispatch(loadTaskSuccess(tasks));
      })
      .catch((error) => {
        throw error;
      });
  };
}
export function saveTask(task) {
  return function (dispatch, getState) {
    return taskApi
      .saveTaskApi(task)
      .then((savedTask) => {
        task.id
          ? dispatch(updateTaskSuccess(savedTask))
          : dispatch(createTaskSuccess(savedTask));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteTask(task) {
  return function (dispatch) {
    dispatch(deleteTaskOptimistic(task));
    return taskApi.deleteTask(task.id);
  };
}
