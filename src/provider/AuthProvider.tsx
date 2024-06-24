import type { FC, ReactNode } from "react";
import { useCallback, useEffect, useReducer, useMemo } from "react";

import { authService } from "../services/AuthServices";
import type { User } from "../types/user";
import type { AuthContextType, State } from "../context/AuthContext";
import { AuthContext } from "../context/AuthContext";
import { initialState } from "../context/AuthContext";

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
    user: User | null;
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
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
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

  const initialize = useCallback(async (): Promise<void> => {
    try {
      authService
        .me()
        .then((user) => {
          console.log(user);
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
      console.error(err);
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

  const signIn = useCallback(
    async (email: string, password: string): Promise<void> => {
      authService
      authService.login(email, password)
        .then((user) => {
          dispatch({
            type: ActionType.SIGN_IN,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        })
        .catch((error) => {
          dispatch({
            type: ActionType.SIGN_IN,
            payload: {
              isAuthenticated: false,
              user: null,
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

  const signOut = useCallback(async (): Promise<void> => {
    dispatch({ type: ActionType.SIGN_OUT });
  }, [dispatch]);

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
