import * as types from "../actions/actionTypes";

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_TASK_SUCCESS:
      return [...state, { ...action.task }];
    case types.LOAD_TASKS_SUCCESS:
      return action.tasks;
    case types.UPDATE_TASK_SUCCESS:
      return state.map((task) =>
        task.id === action.task.id ? action.task : task
      );
    case types.DELETE_TASK_OPTIMISTIC:
      return state.filter((task) => task.id !== action.task.id);
    default:
      return state;
  }
};

export default taskReducer;
