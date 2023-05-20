import { NextComponentType, NextPageContext } from "next";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

const ContextAuth = createContext({});

interface Props {
  dataUser: object | null | undefined;
  children: ReactNode;
}

interface UserInterface {
  user: object;
  setUser: Function;
}

export default function AuthContext({ children }: Props) {
  const [user, setUser] = useState<UserInterface>();

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

export const useAuthConsumer = () => {
  const data = useContext(ContextAuth);
  return data;
};
