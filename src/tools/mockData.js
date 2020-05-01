const tasks = [
  {
    id: 1,
    title: "Sell car",
    due: "05/01/2020",
    importance: "Medium",
    category: "Home"
  },
  {
    id: 2,
    title: "eCQM Workflow",
    due: "05/02/2020",
    importance: "Medium",
    category: "Work"
  },
  {
    id: 3,
    title: "Taxes",
    due: "05/03/2020",
    importance: "Medium",
    category: "Home"
  }
];

const newTask = {
  id: null,
  title: "",
  due: "",
  importance: "",
  category: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newTask,
  tasks
};
