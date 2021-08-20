import { createContext, useReducer } from "react";
import { v4 } from "uuid";

import appReducer from "./AppReducer";

const initialState = {
  tasks: [
    {
      id: "1",
      title: "some title",
      description: "some description",
      done: false,
    },
    {
      id: "2",
      title: "some title",
      description: "some description",
      done: false,
    },
  ],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addTask(task) {
    dispatch({
      type: "ADD_TASK",
      payload: { ...task, id: v4(), done: false },
    });
  }

  function updateTask(updatedTask) {
    dispatch({
      type: "UPDATE_TASK",
      payload: updatedTask,
    });
  }

  function deleteTask(id) {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }

  function toggleTaskDone(id) {
    dispatch({
      type: "TOGGLE_TASK_DONE",
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskDone
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
