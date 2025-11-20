import axios from "@/axios_api/axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

type UserState = {
  currentUser: { _id: string } | null;
  token: string | null;
  authReady: boolean;
  actions: {
    createUser: (userinformation: RegisterInputs) => void;
    loginUser: (userinformation: LoginInputs) => void;
    logoutUser: () => void;
  };
};

const defaultState: UserState = {
  currentUser: null,
  token: null,
  authReady: false,
  actions: {
    createUser: () => {},
    loginUser: () => {},
    logoutUser: () => {},
  },
};

const UserContext = createContext<UserState>(defaultState);

function UserProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<{ _id: string } | null>(null);
  const [token, setToken] = useState<string | null>("");
  const [authReady, setAuthReady] = useState<boolean>(defaultState.authReady);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = sessionStorage.getItem("jwt");
        if (!token) return;

        const res = await axios.get("api/users/check", {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("jwt") || ""}`,
          },
        });

        if (res.status === 200) {
          setToken(sessionStorage.getItem("jwt"));
          setCurrentUser(res.data._id);
        }
      } catch (error: any) {
        console.log(error.message);
        sessionStorage.removeItem("jwt");
        return;
      } finally {
        setAuthReady(true);
      }
    };
    checkToken();
  }, []);

  // Public functions
  const createUser: typeof defaultState.actions.createUser = async (
    userinformation: RegisterInputs
  ) => {
    const res = await axios.post("api/users/register", userinformation);

    if (res.status !== 201) return;

    setToken(res.data.userToken);
    setCurrentUser(res.data._id);

    sessionStorage.setItem("jwt", res.data.userToken);
  };

  const loginUser: typeof defaultState.actions.loginUser = async (
    userinformation: LoginInputs
  ) => {
    const res = await axios.post("api/users/login", userinformation);
    if (res.status !== 200) return;

    console.log(res.data.userToken);
    setToken(res.data.userToken);
    setCurrentUser(res.data._id);

    sessionStorage.setItem("jwt", res.data.userToken);
  };

  const logoutUser: typeof defaultState.actions.logoutUser = () => {
    sessionStorage.removeItem("jwt");
    setToken(null);
    setCurrentUser(null);
    return;
  };

  const actions = {
    createUser,
    loginUser,
    logoutUser,
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        authReady,
        token,
        actions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be called within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
