import {
  TASK_GET_SUCCESS,
  TASK_GET_LOADER,
  TASK_UPDATE_LOADER,
} from "../../Const/reducerConst";
const InitialState = {
  tableData: {},
  isLoading: false,
  isUpdating: false,
};

const InitialReducer = (state = InitialState, action) => {
  switch (action.type) {
    case TASK_GET_SUCCESS:
      const {
        payload: { tableData, tasks },
      } = action;
      return {
        ...state,
        tableData: tableData,
        taskData: tasks,
      };
    case TASK_GET_LOADER:
      const {
        payload: { isLoading },
      } = action;
      return { ...state, isLoading: isLoading };
    case TASK_UPDATE_LOADER:
      const {
        payload: { isUpdating },
      } = action;
      return { ...state, isUpdating: isUpdating };
    default:
      return { ...state };
  }
};

export default InitialReducer;
