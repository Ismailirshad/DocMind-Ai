import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const userStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password }: SignupData) => {
    set({ loading: true });

    try {
      const res = await axios.post("api/auth/register", {
        name,
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
      toast.success("Account created successfully");
      return true;
    } catch (error: any) {
      set({ loading: false });
      toast.error(error.response?.data?.message);
    }
  },
  login: async ({ email, password }: LoginData) => {
    set({ loading: true });

    try {
      const res = await axios.post(
        "api/auth/login",
        { email, password },
        { withCredentials: true },
      );
      set({ user: res.data.user, loading: false });
      toast.success("logged in successfully");
      return true;
    } catch (error: any) {
      set({ loading: false });
      toast.error(error.response?.data?.message);
    }
  },
  logout: async () => {
    try {
      await axios.post("api/auth/logout", {}, { withCredentials: true });
      set({ user: null });
      toast.success("logged out successfully");
    } catch (error: any) {
      toast.error("Failed to log out");
    }
  },
  profile: async () => {

    try {
      const res = await axios.get("api/auth/profile", {
        withCredentials: true,
      });
      console.log("User profile:", res.data.user);
      set({ user: res.data.user, checkingAuth: false });
    } catch (error: any) {
      set({ loading: false, checkingAuth: false });
    }
  },
}));
