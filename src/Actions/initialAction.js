import {
  TASK_GET_SUCCESS,
  TASK_GET_LOADER,
  TASK_UPDATE_LOADER,
} from "../Const/reducerConst";
import { convertToTableData } from "./helper";
const Tasks = [
  {
    id: 1,
    taskName: "Task 1",
    description: "Test description 1",
    completed: false,
  },
  {
    id: 2,
    taskName: "Task 2",
    description: "Test description 2",
    completed: true,
  },
  {
    id: 3,
    taskName: "Task 3",
    description: "Test description 3",
    completed: false,
  },
];

export const getAllTask = () => {
  return (dispatch) => {
    dispatch({
      type: TASK_GET_LOADER,
      payload: { isLoading: true },
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Tasks);
      }, 2000);
    })
      .then((tasks) => {
        const tableData = convertToTableData(Tasks);
        dispatch({ type: TASK_GET_SUCCESS, payload: { tableData, tasks } });
        dispatch({
          type: TASK_GET_LOADER,
          payload: { isLoading: false },
        });
        return tasks;
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const addTask = (task) => {
  return (dispatch, getState) => {
    dispatch({
      type: TASK_UPDATE_LOADER,
      payload: { isUpdating: true },
    });
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("success");
      }, 2000);
    })
      .then((res) => {
        if (res === "success") {
          const {
            tasks: { taskData },
          } = getState();
          const newTasks = [
            ...taskData.slice(0, taskData.length),
            {
              id: Math.floor(Math.random() * new Date().getTime() + 1),
              ...task,
            },
          ];
          const tableData = convertToTableData(newTasks);
          dispatch({
            type: TASK_GET_SUCCESS,
            payload: { tableData, tasks: newTasks },
          });
          dispatch({
            type: TASK_UPDATE_LOADER,
            payload: { isUpdating: false },
          });
        }
        return res;
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const updateTask = (id, updatedTask) => {
  return (dispatch, getState) => {
    dispatch({
      type: TASK_UPDATE_LOADER,
      payload: { isUpdating: true },
    });
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("success");
      }, 2000);
    })
      .then((res) => {
        if (res === "success") {
          const {
            tasks: { taskData },
          } = getState();
          const modifiedTaskIndex = taskData.findIndex(
            (task) => task.id === id
          );
          const newTasks = [
            ...taskData.slice(0, modifiedTaskIndex),
            updatedTask,
            ...taskData.slice(modifiedTaskIndex + 1, taskData.length),
          ];
          const tableData = convertToTableData(newTasks);
          dispatch({
            type: TASK_GET_SUCCESS,
            payload: { tableData, tasks: newTasks },
          });
          dispatch({
            type: TASK_UPDATE_LOADER,
            payload: { isUpdating: false },
          });
        }
        return res;
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const removeTask = (ids) => {
  return (dispatch, getState) => {
    dispatch({
      type: TASK_UPDATE_LOADER,
      payload: { isUpdating: true },
    });
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("success");
      }, 2000);
    })
      .then((res) => {
        if (res === "success") {
          const {
            tasks: { taskData },
          } = getState();
          const filterTaskData = taskData.filter(
            (task) => !ids.includes(task.id)
          );
          const newTasks = [...filterTaskData];
          const tableData = convertToTableData(newTasks);
          dispatch({
            type: TASK_GET_SUCCESS,
            payload: { tableData, tasks: newTasks },
          });
          dispatch({
            type: TASK_UPDATE_LOADER,
            payload: { isUpdating: false },
          });
        }
        return res;
      })
      .catch((e) => {
        console.error(e);
      });
  };
};
