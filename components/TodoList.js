import { useState, useEffect } from 'react'
import { supabase } from '../lib/initSupabase'

export default function Todos({ user, settingsName = "" }) {
  const [emotions, setEmotions] = useState([0,0,0,0,0,0,0])
  const [username, setUsername] = useState(settingsName)
  const [errorText, setError] = useState('')
  const [curEmotion, setCurEmotion] = useState(0);

  const emotionsList = [
    "angry", "happy", "sad", "bored", "exited", "confused", "surprised"
  ];

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase.from('todos').select('*')
  .eq('user_id', user.id).order('id', true)
    if (error) console.log('error', error)
  }
  const addTodo = ( emotions,curEmotion,username) => {
    let emotionsArr = emotions;
    emotionsArr[curEmotion]++;
    //emotionsArr[curEmotion]++;
    setEmotions(emotions[curEmotion]+1);
    console.log(emotions,emotionsArr, curEmotion,emotions[curEmotion]+1);////swhaaaaa object object
    if (username.length) {
      let { data: emotionsArr, error } = supabase
        .from('todos')
        .insert({ emotion: emotionsArr, user_id: user.id, username })
        .single()
      if (error) setError(error.message)
      else setEmotions(emotions)
    }
    else {
      alert("Add username");
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
    
      
      <div className="w-full relative z-10 max-w-md flex flex-col">
      
      <h1 className="mb-12" >Seven emotions</h1>
      <div className="flex flex-row flex-nowrap gap-2 my-2">
        <button className="btn-black" onClick={() => addTodo(emotions, curEmotion, username)}>
          Add
        </button>
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className="shadow overflow-hidden rounded-md">
          <ul className='flex flex-row flex-nowrap justify-between'>
            {emotionsList.map((emo, index) => (
              <div className="rounded-full " onClick={() => setCurEmotion(index)} key={emo+index} >{emo}</div>
            ))}
        </ul>
      </div>
    </div></>
  )
}

const Todo = ({ todo }) => {

  return (
    <li className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out" >
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
