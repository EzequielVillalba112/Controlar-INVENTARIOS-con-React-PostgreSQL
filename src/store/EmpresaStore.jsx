import { create } from "zustand";
import { contarUsuarioXempresa, viewEmpresa } from "../supabase/CrudEmpresa";

export const useEmpresaStore = create((set, get) => ({
  cantidadUsuarios: 0,
  dataEmpresa: [],
  mostrarEmpresa: async (id) => {
    const res = await viewEmpresa(id);
    set({ dataEmpresa: res });
    return res;
  },
  contarUsuarioXempresa: async (p) => {
    const res = await contarUsuarioXempresa(p);
    set({ cantidadUsuarios: res });
    return res;
  },
}));
