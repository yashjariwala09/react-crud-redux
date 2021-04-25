import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Table from "../Component/CustomTable/CustomTable";
import TaskModal from "../Component/Modal/TaskModal";
import WarnningModal from "../Component/Modal/WarningModal";
import Spinner from "../Component/Loader/Loader";
import * as InitialActions from "../Actions/initialAction";

import "../App.css";
function MainScreen(props) {
  const {
    taskData: { tableData, isLoading, isUpdating },
  } = props;

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openRemoveModel, setOpenRemoveModel] = useState(false);

  useEffect(() => {
    const fetchAllTask = () => {
      props.taskActions.getAllTask();
    };
    fetchAllTask();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const updateTask = (id, value) => {
    props.taskActions.updateTask(id, value);
  };

  const addNewTask = (value) => {
    props.taskActions.addTask(value);
  };

  const openModal = (modalName, task) => {
    switch (modalName) {
      case "add":
        setOpen(true);
        break;
      case "edit":
        setOpenEdit(true);
        setSelectedTask(task);
        break;
      case "remove":
        setOpenRemoveModel(true);
        setSelectedTask(task);
        break;
      default:
        break;
    }
  };

  const oncloseModal = (modalName) => {
    switch (modalName) {
      case "add":
        setOpen(false);
        break;
      case "edit":
        setOpenEdit(false);
        setSelectedTask(null);
        break;
      case "remove":
        setOpenRemoveModel(false);
        setSelectedTask(null);
        break;
      default:
        break;
    }
  };

  const onSubmit = (value, id) => {
    if (id) {
      updateTask(id, value);
    } else {
      addNewTask({ ...value, completed: false });
    }
  };

  const onRemove = () => {
    if (selectedTask) {
      const selecteTasksIDs = Object.keys(selectedTask).map(
        (key) => selectedTask[key].originalValue.id
      );
      props.taskActions.removeTask(selecteTasksIDs);
    }
    oncloseModal("remove");
  };

  const TotalSelectedTask = selectedTask && Object.keys(selectedTask).length;
  console.log(isLoading);
  if (isLoading) {
    return (
      <div className="table-wrapper">
        <Spinner width={100} height={100} />
      </div>
    );
  }
  return (
    <div className="table-wrapper">
      <Table
        tableData={tableData}
        onUpdateTask={updateTask}
        openModal={openModal}
        isUpdating={isUpdating}
      />
      <TaskModal
        open={open}
        openEdit={openEdit}
        oncloseModal={oncloseModal}
        selectedTask={selectedTask}
        onSubmit={onSubmit}
      />
      <WarnningModal
        open={openRemoveModel}
        oncloseModal={oncloseModal}
        selectedTask={selectedTask}
        onSubmit={onRemove}
        totalSelectedTask={TotalSelectedTask}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { tasks } = state;
  return {
    taskData: tasks,
  };
};

const mapDispatchToProps = (dispatch) => ({
  taskActions: bindActionCreators(InitialActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
