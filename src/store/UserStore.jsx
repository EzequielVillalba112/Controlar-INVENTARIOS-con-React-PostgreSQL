import { create } from "zustand";
import { insertUser, viewUser } from "../supabase/CrudUser";
import { SUPABASE } from "../supabase/SupaBase.config";

export const useUserStore = create((set, get) => ({
  signUpNewUserAdmin: async (p) => {
    console.log(p);

    const { data, error } = await SUPABASE.auth.signUp({
      email: p.correo,
      password: p.pass,
    });
    console.log(data);

    if (error) return null;

    const datUser = await insertUser({
      idauth: data.user.id,
      fecha_registro: new Date(),
      tipo_user: p.tipouser,
    });

    return datUser;
  },
  idUsuario: 0,
  mostrarUsuario: async () => {
    const res = await viewUser();
    set({ idUsuario: res.id });
    return res;
  },
}));
