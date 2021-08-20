export default function appReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "UPDATE_TASK": {
      const updatedTask = action.payload;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id === updatedTask.id) {
          updatedTask.done = task.done;
          return updatedTask;
        }
        return task;
      });
      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TOGGLE_TASK_DONE":
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return { ...task, done: !task.done };
        }
        return task;
      });
      return {
        ...state,
        tasks: updatedTasks,
      };
    default:
      return state;
  }
}
