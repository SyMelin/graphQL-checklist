import { useQuery, gql } from '@apollo/client';
import './App.css';

const GET_TODOS = gql`
  query getTodos {
    todos {
      done
      id
      text
    }
  }
`;

//list todos
//add todos
//toggle todos
//delete todos

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data)

  return (
    <div className="App">
      <h1 className="App__title">GraphQL Checklist</h1>
      {/*Todo form */}
      <form className="form">
        <h1 className="form__title">New Task</h1>
        <input
          className="form__input"
          type="text"
          placeholder="Write a new task"
        />
        <button
          className="form__button"
          type="submit"
        >
          Create
        </button>
      </form>
      <div className="todoList">
        {data.todos.map(todo => (
          <div
            key={todo.id}
            className="todo"
          >
            <input
              className="todo__checkbox"
              type="checkbox"
              //checked={todo.done}
            />
            <p className="todo__text">
              {todo.text}
              <span className="todo__checkLine"></span>
            </p>
            
            <button
            className="todo__button--delete"
              type="button"
            >
              X
            </button>
          </div>
      ))}
      </div>
    </div>
  );
}

export default App;