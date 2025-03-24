import { create } from "zustand";
import { SUPABASE } from "../supabase/SupaBase.config";

export const useAuthStore = create((set, get) => ({
  signInWithEmail: async (p) => {
    const { data, error } = await SUPABASE.auth.signInWithPassword({
      email: p.correo,
      password: p.pass,
    });

    if (error) {
      return null;
    }

    return data.user;
  },
  signOut: async () => {
    const { error } = await SUPABASE.auth.signOut();

    if(error){
        throw new Error("Erro en cierre de sesión "+error)
    }
  },
}));
