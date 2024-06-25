import type { FC, ReactNode } from "react";
import { useCallback, useEffect, useReducer, useMemo, useState } from "react";
import axios from "axios";
import { authService } from "../services/AuthServices";
import type { User } from "../types/user";
import type { AuthContextType, State } from "../context/AuthContext";
import { AuthContext, initialState } from "../context/AuthContext";

enum ActionType {
  INITIALIZE = "INITIALIZE",
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  SIGN_OUT = "SIGN_OUT",
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: {
    isAuthenticated: boolean;
  };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type SignUpAction = {
  type: ActionType.SIGN_UP;
};

type Action = InitializeAction | SignInAction | SignUpAction | SignOutAction;

type Handler = (state: State, action: any) => State;

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: false,
      user,
    };
  },
  SIGN_IN: (state: State, action: SignInAction): State => {

    return {
      ...state,
      isAuthenticated: false,
    };
  },
  SIGN_UP: (state: State): State => {
    return {
      ...state,
      isAuthenticated: false,
    };
  },
  SIGN_OUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const initialize = useCallback(async (): Promise<void> => {
    try {
      authService
        .me()
        .then((user) => {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        })
        .catch((error) => {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        });
    } catch (err) {
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const signIn = useCallback(
    async (email: string, password: string): Promise<void> => {
      authService
        .login(email, password)
        .then((user) => {
          location.reload();
          dispatch({
            type: ActionType.SIGN_IN,
            payload: {
              isAuthenticated: true,
            },
          });
        })
        .catch((error) => {
          dispatch({
            type: ActionType.SIGN_IN,
            payload: {
              isAuthenticated: false,
            },
          });
        });
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (email: string, name: string, password: string): Promise<void> => {
      await authService.register(name, email, password);
      dispatch({
        type: ActionType.SIGN_UP,
      });
    },
    [dispatch]
  );


  const signOut = useCallback(
    async (): Promise<void> => {
      await authService.logout();
      dispatch({
        type: ActionType.SIGN_OUT,
      });
    },
    [dispatch]
  );

  const contextValue: AuthContextType = useMemo(
    () => ({
      ...state,
      signIn,
      signUp,
      signOut,
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
