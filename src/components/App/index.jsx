import { useQuery } from '@apollo/client'
import { GET_TODOS } from '../../utils/queries';
import Form from '../Form';
import TodoList from '../TodoList';
import './App.css';

function App() {
  const { loading, error, data } = useQuery(GET_TODOS)

  if (loading) return <p className="loading">Loading...</p>
  if (error) return <p className="error">Error : {error.message}</p>

  console.log(data)

  return (
    <div className="App">
      <h1 className="App__title">GraphQL Checklist</h1>
      <Form />
      <TodoList data={data} />
    </div>
  )
}

export default App
