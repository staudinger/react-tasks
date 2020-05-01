import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/styles.css";

const TaskForm = ({
  task,
  onSave,
  onChange,
  onDateChange,
  dueDate,
  saving = false,
  errors = {},
  importanceOptions = [
    { option: "High" },
    { option: "Medium" },
    { option: "Low" }
  ],
  categoryOptions = [{ option: "Home" }, { option: "Work" }]
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{task.id ? "Edit " : "Add "}Task</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="Task"
        value={task.title}
        onChange={onChange}
        error={errors.title}
      />
      <label>Due </label>
      <ReactDatePicker
        selected={dueDate}
        dateFormat="MM/dd/yyyy"
        value={dueDate}
        onChange={onDateChange}
        error={errors.due}
      />
      <SelectInput
        name="importance"
        label="Importance"
        value={task.importance || ""}
        defaultOption="Select Importance Level"
        options={importanceOptions.map(importanceOption => ({
          value: importanceOption.option,
          text: importanceOption.option
        }))}
        onChange={onChange}
        error={errors.importanceOption}
      />
      <SelectInput
        name="category"
        label="Category"
        value={task.category || ""}
        defaultOption="Select Category"
        options={categoryOptions.map(categoryOption => ({
          value: categoryOption.option,
          text: categoryOption.option
        }))}
        onChange={onChange}
        error={errors.categoryOption}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};
TaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default TaskForm;
