import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

export default function Todos() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()
    return (
        <>
            <div className="flex flex-wrap gap-y-3">
                {todos.map((todo) => (
                    <div key={todo.id} className='w-full flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 font-medium'>
                        <input
                            type="text"
                            className={`outline-none w-full bg-transparent rounded-lg`}
                            value={todo.text}
                            readOnly
                        />
                        <button
                            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                            onClick={() => dispatch(removeTodo(todo.id))}
                        >
                            ❌
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

