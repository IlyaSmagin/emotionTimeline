import { useState, useEffect } from 'react'
import { supabase } from '../lib/initSupabase'

export default function Todos({ user }) {
  const [todos, setTodos] = useState([])
  const [username, setUsername] = useState("")
  const [errorText, setError] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async (username) => {
    let { data: todos, error } = await supabase.from('todos').select('*').eq('username', username).order('id', true)
    if (error) console.log('error', error)
    else setTodos(todos)
  }


  return (
    <>
      
    <div className="w-full z-20 max-w-md flex flex-col">
      
      <h1 className="mb-12" >Seven emotions</h1>
      <div className="w-full flex flex-row gap-2 my-2">
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="make coffee"
          value={username}
          onChange={(e) => {
            setError('');
            setUsername(e.target.value.toLowerCase());
            fetchTodos(e.target.value.toLowerCase());
          }}
        />
        <button className="btn-black min-w-fit" onClick={() => fetchTodos(username)}>
          Find user
        </button>
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo}  />
          ))}
        </ul>
      </div>
      </div>
      </>
  )
}

const Todo = ({ todo }) => {

  return (
    <li
      onClick={(e) => {
        e.preventDefault()
        toggle()
      }}
      className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
    >
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">{todo.task}</div>
        </div>
        <div>
        </div>
      </div>
    </li>
  )
}

const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)
