import React, { createContext, useContext, useEffect, useState } from "react";
import { SUPABASE } from "../supabase/SupaBase.config";

const AuthContext = createContext();

// AuthContext.jsx
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Primero, obtener sesión inicial
    SUPABASE.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Luego, suscribirse a cambios de sesión
    const { data: authListener } = SUPABASE.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => authListener.subscription?.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => useContext(AuthContext);
