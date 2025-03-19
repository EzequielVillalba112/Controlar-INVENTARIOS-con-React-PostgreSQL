import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  signUpNewUserAdmin: async (p) => {
    await supabase.auth.signUp({
      email: p.email,
      password: p.password,
    });
  },
}));
