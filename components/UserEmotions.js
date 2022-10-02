import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import Image from "next/image";

export default function Todos({ user }) {
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState("");
  const [errorText, setError] = useState("");

  const friends = [
    { name: "Рома Винегрет", style: "from-red-900 via-purple-800 to-pink-700" },
    {
      name: "Константин Владимиро-Кабаевский",
      style: "from-red-500 via-blue-500 to-green-700",
    },
    {
      name: "Маргарита Астафьева",
      style: "from-orange-500 via-yellow-300 to-cyan-700",
    },
    {
      name: "Пантелей Владимиров",
      style: "from-purple-400 via-cyan-400 to-blue-300",
    },
    {
      name: "Костя Череп Сосиска",
      style: "from-green-700 via-red-400 to-yellow-300",
    },
  ];
  
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (username) => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .eq("username", username)
      .order("id", true);
    if (error) console.log("error", error);
    else setTodos(todos);
  };

  return (
    <>
      <div className="w-full z-20 max-w-md flex flex-col">
        <h1 className="text-4xl sm:text-6xl absolute top-4 left-4 z-20">Друзья</h1>
        <div className="w-full gap-2 my-2 hidden">
          <input
            className="rounded w-full p-2 hidden"
            type="text"
            placeholder="make coffee"
            value={username}
            onChange={(e) => {
              setError("");
              setUsername(e.target.value.toLowerCase());
              fetchTodos(e.target.value.toLowerCase());
            }}
          />
          <button
            className="btn-black min-w-fit hidden"
            onClick={() => fetchTodos(username)}
          >
            Find user
          </button>
        </div>
        {!!errorText && <Alert text={errorText} />}
        <div className="">
          <ul>
            {friends.map((fri, index) => (
              <li
                className="bg-white rounded-2xl shadow-2xl p-4 flex flex-row justify-start mb-2 sm:mb-4"
                key={index}
              >
                <Image
                  src={"/../public/emotion" + (1 + index) + ".png"}
                  className="relative w-12 h-12 rounded-full active:scale-90 aspect-square"
                  width={44}
                  height={36}
                  onClick={() => setCurEmotion(index)}
                  key={index}
                />
                <div className="flex flex-col w-full ml-2">
                  {fri.name}
                  <div className={"mt-2 rounded w-full h-2 bg-gradient-to-r "+ fri.style}></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const Todo = ({ todo }) => {
  return (
    <li className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">
            {todo.task}
          </div>
        </div>
        <div></div>
      </div>
    </li>
  );
};

const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
);
