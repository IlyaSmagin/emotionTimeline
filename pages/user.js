import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";
import TodoList from "../components/UserEmotions";

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
            <button
            className=" absolute top-4 right-4 btn-black w-24"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) console.log("Error logging out:", error.message);
            }}
          >Logout</button>
        <div className="max-w-lg w-full h-full flex flex-col justify-center items-center p-4">
          <TodoList user={supabase.auth.user()} />
            </div>
          </>
      )}
    </div>
  );
}
