import TodoList from "../components/TodoList";
import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";
import { useEffect, useState } from "react";
import MeshGradient from "mesh-gradient.js";
import avatar1 from "../img/av1.png";
import avatar2 from "../img/av2.png";
import avatar3 from "../img/av3.png";
import avatar4 from "../img/av4.png";
import Image from "next/image";

export default function IndexPage() {
  const [errorText, setError] = useState("");
  const { user } = Auth.useUser();
  const gradient = new MeshGradient();
  const canvasId = "my-canvas";
  const [username, setUsername] = useState("lalacode");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const COLORS = [
    "#FECACA",
    "#FED7AA",
    "#FEF9C3",
    "#A7F3D0",
    "#A5F3FC",
    "#BFDBFE",
    "#DDD6FE",
  ];

  useEffect(() => {
    gradient.initGradient("#" + canvasId, COLORS);
    // Any positive numeric value which acts as a seed for mesh pattern
    gradient?.changePosition(Math.random() * 700);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <canvas
        className="absolute z-0 w-screen h-screen"
        id={canvasId}
        width="1080"
        height="1920"
      />
      {!user ? (
        <div className="w-full relative z-10 h-full flex flex-col justify-center items-center p-4">
          <div>
            <Auth
              supabaseClient={supabase}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
            />
          </div>
        </div>
      ) : (
        <>
          {!isSettingsOpen ? (
            <button
              onClick={() => {
                setIsSettingsOpen(!isSettingsOpen);
              }}
              className="absolute z-20 top-4 right-4 rounded-lg bg-transparent border border-gray-500 w-14 h-14 flex justify-center items-center"
            >
              <svg
                className="w-12 h-12 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </button>
          ) : (
            <div className="absolute top-20 w-max-md rounded-2xl w-3/4 h-fit bg-white z-30">
              <ul className="r">
                <li className="mx-3 my-2 flex flex-row justify-between items-center flex-nowrap">
                  <span className="w-48 p-2 ">????????????</span>
                  <img
                    className="w-16 h-16 rounded-2xl"
                    src="https://github.com/rfeskov/r.feskov/blob/main/photo_2022-10-02%2012.34.41.jpeg?raw=true"
                  />
                </li>
                <li className="flex flex-row justify-between flex-nowrap">
                  <span className="mx-3 my-2 w-48 px-2 ">??????</span>
                  <span className="mx-3 my-2 w-48 px-2 text-right">
                    ????????????????????
                  </span>
                </li>

                <li className="flex flex-row justify-between flex-nowrap">
                  <span className="mx-3 my-2 w-48 px-2 ">??????????????</span>
                  <input
                    className="mx-3 my-2 w-1/2 px-2 placeholder:text-black text-right"
                    type="text"
                    placeholder={username || "?????????????? ??????"}
                    value={username}
                    required
                    onChange={(e) => {
                      setError("");
                      setUsername(e.target.value.toLowerCase());
                    }}
                  />
                </li>
                <li className="flex flex-row justify-between flex-nowrap">
                  <span className="mx-3 my-2 w-48 px-2 ">???????? ????????????????</span>
                  <span className="mx-3 my-2 w-48 px-2 text-right">
                    11.05.2000
                  </span>
                </li>
                <li className="flex flex-row justify-between flex-nowrap">
                  <span className="mx-3 my-2 w-48 px-2 ">????????????</span>
                  <span className="mx-3 my-2 w-48 px-2 text-right">5</span>
                </li>
                <li className="cursor-pointer flex flex-row justify-between flex-nowrap">
                  <span className="mx-3 my-2 w-48 px-2 ">
                    ???????????????????? ????????????
                  </span>
                </li>
                <li className="cursor-pointer flex flex-row justify-between flex-nowrap">
                  <span className="mx-3 my-2 w-48 px-2 ">???????????? ????????????</span>
                </li>
                <li className="cursor-pointer flex flex-row justify-between flex-nowrap">
                  <span className="mx-3 my-2 w-48 px-2 ">??????????????????????</span>
                </li>
                <li
                  className="cursor-pointer mx-3 my-2 w-48 px-2 text-gray-600"
                  onClick={async () => {
                    const { error } = await supabase.auth.signOut();
                    if (error) console.log("Error logging out:", error.message);
                  }}
                >
                  ?????????? ???? ????????????????
                </li>
              </ul>
            </div>
          )}
          <div className="max-w-lg w-full h-full flex flex-col justify-center items-center p-4">
            <TodoList user={supabase.auth.user()} settingsName={username} />
          </div>
          {isSettingsOpen ? (
            <button
              onClick={() => {
                setIsSettingsOpen(!isSettingsOpen);
              }}
              className="z-20 absolute bottom-4 w-24 h-24 border border-gray-400 bg-white/70 rounded-3xl flex justify-center items-center p-6"
            >
              <svg
                className="w-full h-full text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
            </button>
          ) : (
            <a
              href="/user"
              className="z-20 absolute bottom-4 w-24 h-24 border border-gray-400 bg-gray-200/30 rounded-3xl grid grid-cols-2 grid-rows-2 gap-2 p-2 justify-center items-stretch"
            >
              <Image
                className="w-6 h-8 bg-gray-200 rounded-xl"
                src={avatar1}
                alt="avatar"
              />
              <Image
                className="w-8 h-8 bg-gray-200 rounded-xl"
                src={avatar2}
                alt="avatar"
              />
              <Image
                className="w-8 h-8 bg-gray-200 rounded-xl"
                src={avatar3}
                alt="avatar"
              />
              <Image
                className="w-8 h-8 bg-gray-200 rounded-xl"
                src={avatar4}
                alt="avatar"
              />
            </a>
          )}
        </>
      )}
    </div>
  );
}
