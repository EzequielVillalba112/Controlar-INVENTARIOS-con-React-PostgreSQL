import { create } from "zustand";
import {
  buscarCategoria,
  editarCategoria,
  eliminarCategoria,
  insertarCategoria,
  mostrarCategoria,
} from "../supabase/CrudCategoria";

export const useCategoriaStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataCategoria: [],
  categoriaItemSelect: [],
  parametros: {},
  mostrarCategoria: async (p) => {
    const res = await mostrarCategoria(p);
    set({ parametros: p }),
      set({ dataCategoria: res }),
      set({ categoriaItemSelect: res[0] });

    return res;
  },
  selectCategoria: (p) => {
    set({ categoriaItemSelect: p });
  },
  insertarCategoria: async (p) => {
    await insertarCategoria(p);
    const { mostrarCategoria } = get();
    const { parametros } = get();
    set(mostrarCategoria(parametros));
  },
  eliminarCategoria: async (p) => {
    await eliminarCategoria(p);
    const { mostrarCategoria } = get();
    const { parametros } = get();
    set(mostrarCategoria(parametros));
  },
  editarCategoria: async (p) => {
    await editarCategoria(p);
    const { mostrarCategoria } = get();
    const { parametros } = get();
    set(mostrarCategoria(parametros));
  },
  buscarCategoria: async (p) => {
    const res = await buscarCategoria(p);
    set({ dataCategoria: res });
  },
}));
