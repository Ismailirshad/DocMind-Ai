import api from "@/lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface userStore {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;
  accessToken: string | null;

  signup: (data: SignupData) => Promise<boolean>;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  profile: () => Promise<void>;
}
interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}
interface ISignupAndLoginRes {
  user: User;
  accessToken: string | null;
}
interface IProfileRes {
  user: User;
}

interface IRefreshRes {
  accessToken: string | null;
}

export const userStore = create<userStore>((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  accessToken: null,

  signup: async ({ name, email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post<ISignupAndLoginRes>("api/auth/register", {
        name,
        email,
        password,
      });
      set({
        user: res.data.user,
        accessToken: res.data.accessToken,
        loading: false,
      });
      toast.success("Account created successfully");
      return true;
    } catch (error) {
      set({ loading: false });
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
        console.log(error.response?.data?.message, "error in signup");
      } else {
        console.error("Failed to signup", error);
      }
      return false;
    }
  },
  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post<ISignupAndLoginRes>(
        "api/auth/login",
        { email, password },
        { withCredentials: true },
      );
      set({
        user: res.data.user,
        accessToken: res.data.accessToken,
        loading: false,
      });
      toast.success("logged in successfully");
      return true;
    } catch (error) {
      set({ loading: false });
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
        console.log(error.response?.data?.message, "error in login");
      } else {
        console.error("Failed to login", error);
      }

      return false;
    }
  },
  logout: async () => {
    try {
      await axios.post("api/auth/logout", {}, { withCredentials: true });
      set({ user: null });
      toast.success("logged out successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
        console.log(error.response?.data?.message, "error in logout");
      } else {
        console.error("Failed to logout", error);
      }
    }
  },
  profile: async () => {
    set({ checkingAuth: true });
    try {
      const res = await api.get<IProfileRes>("api/auth/profile");
      set({ user: res.data.user, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      if (axios.isAxiosError(error)) {
        // toast.error(error.response?.data?.message);
        console.log(error.response?.data?.message, "error in checking profile");
      } else {
        console.error("Failed to check profile", error);
      }
    }
  },
  refresh: async () => {
    try {
      const res = await api.get<IRefreshRes>("api/auth/refresh");
      set({ accessToken: res.data.accessToken });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // toast.error(error.response?.data?.message);
        console.log(error.response?.data?.message, "error in refresh");
      } else {
        console.error("Failed to refresh", error);
      }
    }
  },
}));
