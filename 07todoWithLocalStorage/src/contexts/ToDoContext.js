import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [
    { id: 1, task: "Buy milk", completed: false },
    { id: 2, task: "Walk the dog", completed: false },
    { id: 3, task: "Do laundry", completed: false },
  ],
  addToDo: (todo) => {} ,
  updateToDo: (id, todo) => {},
  deleteToDo: (id) => {},
  toggleComplete: (id) => {}
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
