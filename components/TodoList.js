import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import avatar from "../img/av1.png";
import Image from "next/image";

export default function Todos({ user, settingsName }) {
  const [emotions, setEmotions] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [username, setUsername] = useState(settingsName);
  const [errorText, setError] = useState("");
  const [curEmotion, setCurEmotion] = useState(0);

  const emotionsList = [
    "angry",
    "happy",
    "sad",
    "bored",
    "exited",
    "confused",
    "surprised",
  ];

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("id", true);
    if (error) console.log("error", error);
  };
  const addTodo = (emotions1, curEmotion, username) => {
    let emotionsArr = emotions1;
    console.log(emotions, emotionsArr, curEmotion, emotions1[curEmotion] + 1);
    emotionsArr[curEmotion]++;
    //emotionsArr[curEmotion]++;
    setEmotions(emotions1[curEmotion] + 1); ////swhaaaaa object object
    if (username.length) {
      let { data: emotionsArr, error } = supabase
        .from("todos")
        .insert({ emotion: emotionsArr, user_id: user.id, username })
        .single();
      if (error) setError(error.message);
      else setEmotions(emotions1);
    } else {
      alert("Add username");
    }
  };

  return (
    <>
      <div className="w-full relative z-10 max-w-md flex flex-col">
        <h1 className="absolute top-4 left-4 z-20">{username}</h1>
        <div className="flex flex-col flex-nowrap justify-center items-center gap-2 my-2">
          <Image
            src={"/../img/emotion" + (1 + curEmotion) + ".png"}
            onClick={() => addTodo(emotions, curEmotion, username)}
            className="relative w-1/2 h-1/2 rounded-full active:scale-90 mx-auto"
            width={150}
            height={150}
          />
        </div>
        {!!errorText && <Alert text={errorText} />}
        <div className="overflow-hidden">
          <ul className="flex flex-row flex-nowrap justify-between">
            {emotionsList.map((emo, index) => (
              <Image
                src={"/../img/emotion" + (1 + index) + ".png"}
                className="relative w-12 h-12 rounded-full active:scale-90"
                width={40}
                height={40}
                onClick={() => setCurEmotion(index)}
                key={emo + index}
              />
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
