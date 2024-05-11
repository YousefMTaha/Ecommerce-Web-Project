import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setUserToken(localStorage.getItem("token"));
      setUserData(JSON.parse(localStorage.getItem("data")));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ userToken, setUserToken, userData, setUserData }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
