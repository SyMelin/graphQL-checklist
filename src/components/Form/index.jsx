import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_TODOS, ADD_TODO } from '../../graphql/queries';
import "./Form.css"

function Form() {
    const [todoText, setTodoText] =  useState("")
    const [addTodo] = useMutation(ADD_TODO, {
        onCompleted: () =>  setTodoText('')
    })

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
      }

    return (
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
    )
}

export default Form