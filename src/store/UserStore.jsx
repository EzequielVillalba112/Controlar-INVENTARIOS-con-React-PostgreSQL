import { create } from "zustand";
import { insertUser } from "../supabase/CrudUser";
import { SUPABASE } from "../supabase/SupaBase.config";

export const useUserStore = create((set, get) => ({
  signUpNewUserAdmin: async (p) => {
    console.log(p);
    
    const { data, error } = await SUPABASE.auth.signUp({
      email: p.email,
      password: p.password,
    });
    console.log(data);

    if (error) return null;

    const datUser = await insertUser({
      idauth: data.user.id,
      fecha_registro: new Date(),
      tipo_user: "admin",
    });

    return datUser;
  },
}));
