"use client";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [formType, setFormType] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loading, login, signup } = userStore();
  const router = useRouter();

  const handleSubmit = async () => {
    if (formType === "login") {
      if (!formData.email || !formData.password) {
        toast.error("All fields are required");
        return
      }
      const result = await login({
        email: formData.email,
        password: formData.password,
      });
      if (result) {
        router.push("/");
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("All fields are required");
        return
      }
      const result = await signup(formData);
      if (result) {
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
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
            />
            {formType === "signup" && (
              <p className="mt-2 text-xs text-zinc-500">
                Password must be at least 6 characters and include an uppercase
                letter, lowercase letter, number, and special character.
              </p>
            )}
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

        <button
          onClick={() => {
            window.location.href = "/api/auth/google";
          }}
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-900 hover:border-zinc-600 active:scale-[0.98]"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285F4"
              d="M21.35 12.23c0-.79-.07-1.55-.2-2.28H12v4.31h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42z"
            />
            <path
              fill="#34A853"
              d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.75z"
            />
            <path
              fill="#FBBC05"
              d="M6.54 13.84a5.86 5.86 0 0 1 0-3.68V7.63H3.3a9.75 9.75 0 0 0 0 8.74l3.24-2.53z"
            />
            <path
              fill="#EA4335"
              d="M12 6.13c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.26 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.38l3.24 2.53C7.31 7.85 9.46 6.13 12 6.13z"
            />
          </svg>

          <span>Continue with Google</span>
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
