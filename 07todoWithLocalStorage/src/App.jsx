import { useEffect, useState } from "react"
import { TodoProvider } from "./contexts/ToDoContext"
import { ToDoForm, ToDoItem } from "./components"

function App() {
  const [todos, setTodos] = useState([])

  const addToDo = (todo) => {
    // setTodos([...todos, todo])
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateToDo = (id, todo) => {
    setTodos((prev) => prev.map((prevToDo) => prevToDo.id === id ? todo : prevToDo))
  }

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addToDo, updateToDo, deleteToDo, toggleComplete }}>
      <div className="bg-[#1e3558] min-h-screen py-8">
        <div className="bg-[#172842] w-full max-w-2xl mx-auto shadow-lg rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <ToDoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'
              >
                <ToDoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
