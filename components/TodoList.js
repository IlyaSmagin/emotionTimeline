import { useState, useEffect } from 'react'
import { supabase } from '../lib/initSupabase'
import { generateJSXMeshGradient } from "meshgrad"

export default function Todos({ user }) {
  const [todos, setTodos] = useState([])
  const [newTaskText, setNewTaskText] = useState('')
  const [username, setUsername] = useState("")
  const [errorText, setError] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase.from('todos').select('*')
  .eq('user_id', user.id).order('id', true)
    if (error) console.log('error', error)
    else setTodos(todos)
  }
  const addTodo = async (taskText) => {
    let task = taskText.trim()
    if (task.length) {
      let { data: todo, error } = await supabase
        .from('todos')
        .insert({ task, user_id: user.id, username })
        .single()
      if (error) setError(error.message)
      else setTodos([...todos, todo])
    }
  }


  return (
    <>
        <input
          className="absolute z-20 top-4 left-4 rounded w-48 p-2"
          type="text"
          placeholder="lalacode"
          value={username}
          required
          onChange={(e) => {
            setError('')
            setUsername(e.target.value.toLowerCase())
          }}
        />
    
      <div style={generateJSXMeshGradient(4)} className="absolute z-0 w-screen h-screen" />
    
      
      <div className="w-full relative z-10 max-w-md flex flex-col">
      
      <h1 className="mb-12" >Seven emotions</h1>
      <div className="flex flex-row gap-2 my-2">
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="make coffee"
          value={newTaskText}
          onChange={(e) => {
            setError('')
            setNewTaskText(e.target.value)
          }}
        />
        <button className="btn-black" onClick={() => addTodo(newTaskText)}>
          Add
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
    </div></>
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
