import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import avatar from "../img/av1.png";
import Image from "next/image";

export default function Todos({ user, settingsName }) {
  const [emotions, setEmotions] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [username, setUsername] = useState(settingsName);
  const [errorText, setError] = useState("");
  const [curEmotion, setCurEmotion] = useState(0);
  const [curLevel, setCurLevel] = useState(0);
  const emotionsList = [
    [
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/angry-face_1f620.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/pouting-face_1f621.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-with-symbols-on-mouth_1f92c.png",
    ],
    [
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/hushed-face_1f62f.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-with-open-mouth_1f62e.png ",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/exploding-head_1f92f.png",
    ],
    [
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/slightly-smiling-face_1f642.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/beaming-face-with-smiling-eyes_1f601.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/star-struck_1f929.png",
    ],
    [
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/anguished-face_1f627.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/fearful-face_1f628.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-screaming-in-fear_1f631.png",
    ],
    [
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/neutral-face_1f610.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/yawning-face_1f971.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/sleeping-face_1f634.png",
    ],
    [
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/slightly-frowning-face_1f641.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/crying-face_1f622.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/loudly-crying-face_1f62d.png",
    ],
    [
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/face-with-spiral-eyes_1f635-200d-1f4ab.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/dizzy-face_1f635.png",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/skull_1f480.png",
    ],
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
    console.log(emotions, curEmotion, emotions1[curEmotion] + 1, curLevel);
    setCurLevel(0);
    if (emotions1[curEmotion] > 3) {
      setCurLevel(1);
    }
    if (emotions1[curEmotion] > 8) {
      setCurLevel(2);
    }
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
      <div className="w-full z-10 max-w-md flex flex-col justify-center items-center p-20 centering">
        <h1 className="text-4xl sm:text-6xl absolute top-4 left-4 z-20 border-b-4 border-teal-500 ">
          {username}
        </h1>
        <div className="grid grid-cols-1 aspect-square justify-center mx-auto my-2">
          <img
            src={emotionsList[curEmotion][curLevel]}
            onClick={() => addTodo(emotions, curEmotion, username)}
            className="styledIMAGE relative w-1/2 h-1/2 rounded-full active:scale-90 mx-auto"
            width={150}
            height={150}
          />
        </div>
        {!!errorText && <Alert text={errorText} />}
        <div className="overflow-hidden">
          <ul className="flex flex-row flex-nowrap justify-between mt-4">
            {emotionsList.map((emo, index) => (
              <img
                src={emo[0]}
                className="relative w-12 h-12 rounded-full active:scale-90"
                width={40}
                height={40}
                onClick={() => {
                  setCurEmotion(index);
                  setCurLevel(0);
                  if (emotions[index] > 4) {
                    setCurLevel(1);
                  }
                  if (emotions[index] > 8) {
                    setCurLevel(1);
                  }
                }}
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
