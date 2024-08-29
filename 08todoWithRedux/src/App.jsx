// import './App.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {

  return (
    <Provider store={store}>
      <div className="bg-[#1e3558] min-h-screen py-8">
        <div className="bg-[#172842] w-full max-w-2xl mx-auto shadow-lg rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <AddTodo />
          </div>
          <div
            className='w-full'
          >
            <Todos />
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default App