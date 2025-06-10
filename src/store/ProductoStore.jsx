import { create } from "zustand";
import {
  buscarProducto,
  editarProducto,
  eliminarProducto,
  insertarProducto,
  mostrarProducto,
  reporteStockProductoId,
  reporteStockTodos,
  reportInventarioValorado,
  reportKardexEntradaSalida,
  reportStockBajoMinimo,
} from "../supabase/CrudProducto";

export const useProductoStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataProducto: [],
  productoItemSelect: [],
  parametros: {},
  mostrarProducto: async (p) => {
    const res = await mostrarProducto(p);
    set({ parametros: p }),
      set({ dataProducto: res }),
      set({ productoItemSelect: res[0] });

    return res;
  },
  selectProducto: (p) => {
    set({ productoItemSelect: p });
  },
  insertarProducto: async (p) => {
    await insertarProducto(p);
    const { mostrarProducto } = get();
    const { parametros } = get();
    set(mostrarProducto(parametros));
  },
  eliminarProducto: async (p) => {
    await eliminarProducto(p);
    const { mostrarProducto } = get();
    const { parametros } = get();
    set(mostrarProducto(parametros));
  },
  editarProducto: async (p) => {
    await editarProducto(p);
    const { mostrarProducto } = get();
    const { parametros } = get();
    set(mostrarProducto(parametros));
  },
  buscarProducto: async (p) => {
    const res = await buscarProducto(p);
    set({ dataProducto: res });
    return res;
  },
  reportStockProductoTodo: async (p) => {
    const res = await reporteStockTodos(p);
    return res;
  },
  reportStockPorProducto: async (p) => {
    const res = await reporteStockProductoId(p);
    return res;
  },
  reporteStockBajoMinimo: async (p) => {
    const res = await reportStockBajoMinimo(p);
    return res;
  },
  reporteKardex: async (p) => {
    const res = await reportKardexEntradaSalida(p);
    return res;
  },
  inventarioValorado: async (p) => {
    const res = await reportInventarioValorado(p);
    return res;
  },
}));
