import { create } from "zustand";
import {
  buscarMarca,
  editarMarca,
  eliminarMarca,
  insertarMarca,
  mostrarMarca,
} from "../supabase/CrudMarca";

export const useMarcaStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    console.log(p);
    
    set({ buscador: p });
  },
  dataMarca: [],
  marcaItemSelect: [],
  parametros: {},
  mostrarMarca: async (p) => {
    const res = await mostrarMarca(p);
    set({ parametros: p }),
      set({ dataMarca: res }),
      set({ marcaItemSelect: res[0] });

    return res;
  },
  selectMarca: (p) => {
    set({ marcaItemSelect: p });
  },
  insertarMarca: async (p) => {
    await insertarMarca(p);
    const { mostrarMarca } = get();
    const { parametros } = get();
    set(mostrarMarca(parametros));
  },
  eliminarMarca: async (p) => {
    await eliminarMarca(p);
    const { mostrarMarca } = get();
    const { parametros } = get();
    set(mostrarMarca(parametros));
  },
  editarMarca: async (p) => {
    await editarMarca(p);
    const { mostrarMarca } = get();
    const { parametros } = get();
    set(mostrarMarca(parametros));
  },
  buscarMarca: async (p) => {
    const res = await buscarMarca(p);
    set({ dataMarca: res });
  },
}));
