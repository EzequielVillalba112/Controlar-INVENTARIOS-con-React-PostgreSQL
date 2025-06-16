import React, { createContext, useContext, useEffect, useState } from "react";
import { SUPABASE } from "../supabase/SupaBase.config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifica si hay sesión activa al cargar
    SUPABASE.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Escucha cambios de autenticación
    const { data: authListener } = SUPABASE.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription?.unsubscribe(); 
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => useContext(AuthContext);
