import { create } from "zustand";
import { viewEmpresa } from "../supabase/CrudEmpresa";

export const useEmpresaStore = create((set, get) => ({
  dataEmpresa:[],
  mostrarEmpresa: async (id) => {
    const res = await viewEmpresa(id);
    set({ dataEmpresa: res });
    return res;
  },
}));
