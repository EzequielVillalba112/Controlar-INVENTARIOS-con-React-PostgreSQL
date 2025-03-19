import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  signInWithEmail: async (p) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: p.email,
      password: p.password,
    });

    if (error) {
      return null;
    }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if(error){
        throw new Error("Erro en cierre de sesión "+error)
    }
  },
}));
