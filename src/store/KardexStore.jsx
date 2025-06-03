import { create } from "zustand";
import {
  anularKardex,
  buscarKardex,
  insertarKardex,
  mostrarKardex,
} from "../supabase/CrudKardex";

export const useKardexStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataKardex: [],
  kardexItemSelect: [],
  parametros: {},
  mostrarKardex: async (p) => {
    const res = await mostrarKardex(p);
    set({ parametros: p }),
      set({ dataKardex: res }),
      set({ kardexItemSelect: res[0] });

    return res;
  },
  selectKardex: (p) => {
    set({ kardexItemSelect: p });
  },
  insertarKardex: async (p) => {
    await insertarKardex(p);
    const { mostrarKardex } = get();
    const { parametros } = get();
    set(mostrarKardex(parametros));
  },
  anularKardex: async (p) => {
    await anularKardex(p);
    const { mostrarKardex } = get();
    const { parametros } = get();
    set(mostrarKardex(parametros));
  },
  buscarKardex: async (p) => {
    const res = await buscarKardex(p);
    set({ dataKardex: res });
  },
}));
