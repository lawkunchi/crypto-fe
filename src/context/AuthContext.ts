import { createContext } from "react";

import { User } from "../types/user";

export interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string;
}

export const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: "",
};

export interface AuthContextType extends State {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});
