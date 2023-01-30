import { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import './App.css';
import React from 'react';

const GET_TODOS = gql`
  query getTodos {
    todos {
      done
      id
      text
    }
  }
`

const TOGGLE_TODO = gql `
  mutation toggleTodo($id: uuid!, $done: Boolean!) {
    update_todos(where: {id: {_eq: $id }}, _set: {done: $done}) {
      returning {
        done
        id
        text
      }
    }
  }
`

const ADD_TODO = gql `
  mutation addTodo($text: String!) {
    insert_todos(objects: {text: $text}) {
      returning {
        done
        id
        text
      }
    }
  }
`

function App() {
  const [todoText, setTodoText] =  useState("")

  const { loading, error, data } = useQuery(GET_TODOS)
  const [toggleTodo] = useMutation(TOGGLE_TODO)
  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () =>  setTodoText('')
  })

  async function handleToggleTodo({ id, done }) {
    const data = await toggleTodo({ variables: { id: id, done: !done }})
    console.log("toggled todo", data)
  }

  async function handleAddTodo(e) {
    e.preventDefault()
    if (!todoText.trim()) return
    const data = await addTodo({
      variables: { text: todoText },
      refetchQueries: [
        { query: GET_TODOS } //execute a query after addTodo mutation is done
      ]
  })
    console.log("added todo", data)
    {/* setTodoText('') */}
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data)

  return (
    <div className="App">
      <h1 className="App__title">GraphQL Checklist</h1>
      {/*Todo form */}
      <form
        className="form"
        onSubmit={handleAddTodo}
      >
        <h1 className="form__title">New Task</h1>
        <input
          className="form__input"
          type="text"
          placeholder="Write a new task"
          onChange={(e) => setTodoText(e.target.value)}
          value={todoText}
        />
        <button
          className="form__button--submit"
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
            >
              X
            </button>
          </div>
      ))}
      </div>
    </div>
  )
}

export default App
