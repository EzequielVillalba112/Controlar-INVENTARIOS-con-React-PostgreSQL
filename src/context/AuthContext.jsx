import { createContext, use, useContext, useEffect, useState } from "react";
import { SUPABASE } from "../supabase/SupaBase.config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const { data: authListener } = SUPABASE.auth.onAuthStateChange(
      (event, session) => {
        async (event, session) => {
          console.log(event, session);
          if (session?.user === null) {
            setUser(null);
          } else {
            setUser(session?.user);
          }
        };
      }
    );

    return () => {
      authListener.subscription;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const userAuth = () =>{
    return useContext(AuthContext);
}
