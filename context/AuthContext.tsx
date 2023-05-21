import { UserInterface } from "@/types/types.d";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

const ContextAuth = createContext(undefined);

interface Props {
  children: ReactNode;
}

export default function AuthContext({ children }: Props) {
  const [user, setUser] = useState<UserInterface | undefined>();

  useEffect(() => {
    const token = window.localStorage.getItem("sessionid");
    if (token) {
      fetch("http://localhost:4000/auth/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUser({ ...res, token });
        });
    }
  }, []);

  return (
    <ContextAuth.Provider value={{ user, setUser }}>
      {children}
    </ContextAuth.Provider>
  );
}

interface DataSend {
  setUser: Function;
  user: UserInterface;
}

export const useAuthConsumer = () => {
  const data = useContext(ContextAuth);
  return data;
};
