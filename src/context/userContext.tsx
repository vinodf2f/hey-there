import React, { createContext, useState, useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type IUser = {
  uid: string;
  displayName?: string | null;
} | null;

interface IUserContext {
  user: IUser;
}

interface IProps {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}

export const UserContext = createContext({ user: null } as IUserContext);

export default function UserProvider(props: IProps) {
  const [user, setUser] = useState<IUser>(null);

  function onAuthStateChanged(authUser: FirebaseAuthTypes.User | null) {
    setUser(authUser);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => React.useContext(UserContext);
