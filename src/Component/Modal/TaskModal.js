import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import CssTextField from "../Input/CustomInput";

const initialState = {
  taskName: "",
  description: "",
};

const initialErrorState = {};

function TaskModal(props) {
  const { open, openEdit, oncloseModal } = props;
  let { selectedTask } = props;
  const [state, setstate] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedTask) {
      let { taskName = "", description = "" } = selectedTask;
      setstate({ taskName, description });
    }
  }, [selectedTask]);

  const handleClose = () => {
    setstate(initialState);
    setErrors(initialErrorState);
    oncloseModal(openEdit ? "edit" : "add");
  };

  const onModalSave = () => {
    if (!checError()) {
      const { onSubmit, selectedTask } = props;
      if (onSubmit) {
        if (selectedTask && selectedTask.id) {
          onSubmit({ ...selectedTask, ...state }, selectedTask.id);
        } else {
          onSubmit(state);
        }
      }
      handleClose();
    }
  };

  const checError = () => {
    let error = false;
    let errorObj = {};
    const stateKeys = (state && Object.keys(state)) || [];
    stateKeys.forEach((key) => {
      if (!(state[key] && state[key].trim("")) || !state[key]) {
        error = true;
        errorObj[key] = true;
      }
    });
    setErrors(errorObj);
    return error;
  };

  const handleChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name && value) {
      setstate({ ...state, [name]: value });
    }
  };
  const isOpen = openEdit || open;
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} onSubmit={onModalSave}>
      <div style={{ marginBottom: "10px" }}>
        <CssTextField
          id="standard-basic"
          label="Task name"
          name={"taskName"}
          onChange={handleChangeInput}
          value={state.taskName}
        />
        {errors.taskName ? (
          <p className="error-message">
            Task name field can't be empty please fill the field before
            submitting.
          </p>
        ) : (
          <></>
        )}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <CssTextField
          id="standard-basic-textarea"
          rows={4}
          multiline
          label="Task description"
          name={"description"}
          onChange={handleChangeInput}
          value={state.description}
        />
        {errors.description ? (
          <p className="error-message">
            Task description field can't be empty please fill the field before
            submitting.
          </p>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
}

export default TaskModal;
