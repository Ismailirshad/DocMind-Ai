"use client";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loading, login, signup } = userStore();
  const router = useRouter()

  const handleSubmit = async() => {
    if (formType === "login") {
      const result =await  login({ email: formData.email, password: formData.password });
      if(result){
        router.push("/");
      }
    } else {
      const result =await signup(formData);
       if(result){
        router.push("/");
      }
    }
  };
  return (
    <main className="min-h-screen w-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">DocMind AI</h1>

          <p className="text-zinc-400 mt-2">
            {formType === "login" ? "Sign in" : "Create an account"} to continue
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          {formType === "signup" && (
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-medium text-white"
          >
            {loading ? (
              <div>
                Loading
                <span className="ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </div>
            ) : formType === "login" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-zinc-800"></div>
          <span className="px-3 text-zinc-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-zinc-800"></div>
        </div>

        <button className="w-full border border-zinc-800 hover:bg-zinc-900 rounded-lg py-3 text-white">
          Continue with Google
        </button>

        <p className="text-center text-zinc-400 text-sm mt-6">
          {formType === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() =>
              setFormType(formType === "login" ? "signup" : "login")
            }
            className="text-blue-500 hover:text-blue-400"
          >
            {formType === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </main>
  );
}
