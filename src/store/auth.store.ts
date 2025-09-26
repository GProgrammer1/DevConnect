import { UserRole } from "@/types/db/enums";
import { create } from "zustand";

type AuthStore = {
  accessToken: string;
  username: string;
  email: string;
  user_id: string;
  roles: UserRole[];
  name: string;

  setAccessToken: (token: string) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setUserId: (id: string) => void;
  setRoles: (roles: UserRole[]) => void; 
  setName: (name: string) => void;
};
const useAuth = create<AuthStore>((set) => ({
  accessToken: "",
  username: "",
  email: "",
  user_id: "",
  roles: [],
  name: "",


  setAccessToken: (token) => set({ accessToken: token }),
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setUserId: (id) => set({ user_id: id }),
  setRoles: (roles) => set({roles: roles}),
  setName: (name) => set({name})
}));

export default useAuth;
