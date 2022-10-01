import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";
import TodoList from "../components/TodoList";

export default function IndexPage() {
  const { user } = Auth.useUser();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-300">
      {!user ? (
        <div className="w-full h-full flex flex-col justify-center items-center p-4">
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
        <div className=" max-w-sm w-full h-full flex flex-col justify-center items-center p-4">
          <TodoList user={supabase.auth.user()} />
          <button
            className="btn-black w-full mt-12"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) console.log("Error logging out:", error.message);
            }}
          >
            Logout
          </button>
        </div></>
      )}
    </div>
  );
}
