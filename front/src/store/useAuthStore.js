import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem("authToken") || null,
  loginAction: async (input) => {
    try {
      const { data } = await axios.post("http://localhost:8888/api/v1/users/login", input);
      console.log(data.data.authToken)
      localStorage.setItem("authToken", data.data.authToken);
      set(()=> ({
        isAuthenticated: true}))
    } catch (error) {
      console.log(error.response?.data);
      set({ isAuthenticated: false });
    }
  },
  fetchUser: async (authtoken) => {
    try {
      const { data } = await axios.get("http://localhost:8888/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      });
      if(data.data){
        console.log("data is verified")
        set(()=> ({user: data.data.userData}))
        set(()=> ({isAuthenticated: true}))
      }
    } catch (error) {
      console.log(error.response?.data);
      set(()=> ({user: null}))
      set(()=> ({isAuthenticated: false}))
    }
  },
}));
