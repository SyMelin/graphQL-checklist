import Todo from '../Todo';
import "./TodoList.css"

function TodoList ({ data }) {
    
    return (
        <div className="todoList">
            {data.todos.map(todo => (
                <Todo
                    key={todo.id}
                    todo={todo}
                />
            ))}
      </div>
    )
}

export default TodoList