import { useMutation } from '@apollo/client'
import { GET_TODOS, TOGGLE_TODO, DELETE_TODO } from '../../utils/queries';
import "./Todo.css"

function Todo({ todo }) {
    const [toggleTodo] = useMutation(TOGGLE_TODO)
    const [deleteTodo] = useMutation(DELETE_TODO)

    async function handleToggleTodo({ id, done }) {
    const data = await toggleTodo({ variables: { id: id, done: !done }})
    console.log("toggled todo", data)
    }

    async function handleDeleteTodo({ id }) {
        const isConfirmed = window.confirm("Do you wan to delete this task ?")
        if (isConfirmed) {
            const data =  await deleteTodo({
            variables: { id },
            update : cache => {
                const prevData = cache.readQuery({ query: GET_TODOS })
                const newTodos = prevData.todos.filter(todo => todo.id !== id)
                cache.writeQuery({ query: GET_TODOS, data: { todos: newTodos }})
            }
            })
        console.log("deleted todo", data)
        }
    }

    return (
        <div
            key={todo.id}
            className="todo"
            data-before={todo.text}
          >
            
            <label
              className="todo__label"
              id={todo.id}
            >
              
              <input
                className="todo__checkbox"
                type="checkbox"
                name={todo.id}
                onClick={() => handleToggleTodo(todo)}
                defaultChecked={todo.done}
              />
              <p className="todo__text">{todo.text}</p>
            </label>
            <button
              className="todo__button--delete"
              type="button"
              onClick={() => handleDeleteTodo(todo)}
            >
              X
            </button>
          </div>
    )
}

export default Todo