import { create } from "zustand";
import {
  buscarPersonal,
  editarPersonal,
  eliminarPermisos,
  eliminarPersonal,
  insertarAsignacion,
  insertarPermisos,
  mostrarModulos,
  mostrarPermisos,
  mostrarPersonal,
} from "../supabase/CrudPersonal";
import { insertUser } from "../supabase/CrudUser";
import { SUPABASE } from "../supabase/SupaBase.config";
import { DataModulosConfiguracion } from "../utils/dataEstatica";

export const usePersonalStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  datapersonal: [],
  datamodulo: [],
  personalItemSelect: [],
  parametros: {},
  mostrarpersonal: async (p) => {
    const res = await mostrarPersonal(p);
    set({ parametros: p }),
      set({ datapersonal: res }),
      set({ personalItemSelect: res[0] });

    return res;
  },
  selectpersonal: (p) => {
    set({ personalItemSelect: p });
  },
  insertarpersonal: async (pAuth, p, dataCheckPermisos) => {
    const { data, error } = await SUPABASE.auth.signUp({
      email: pAuth.email,
      password: pAuth.pass,
    });

    if (error) return error;

    const dataUserNew = await insertUser({
      nombre: p.nombre,
      dni: p.dni,
      telefono: p.telefono,
      direccion: p.direccion,
      fecha_registro: new Date(),
      stado: "activo",
      idauth: data.user.id,
      tipo_user: p.tipo_user,
      correo: p.correo,
    });

    await insertarAsignacion({
      id_empresa: p.id_empresa,
      id_usuario: dataUserNew.id,
    });

    dataCheckPermisos.forEach(async (item) => {
      if (item.check) {
        let parametrospermisos = {
          id_usuario: dataUserNew.id,
          idmodulo: item.id,
        };
        await insertarPermisos(parametrospermisos);
      }
    });

    await SUPABASE.auth.signOut();
    return data.user;
  },
  eliminarpersonal: async (p) => {
    await eliminarPersonal(p);
    const { mostrarpersonal } = get();
    const { parametros } = get();
    set(mostrarpersonal(parametros));
  },
  editarpersonal: async (p, dataPermisos, idEmpresa) => {
    await editarPersonal(p);
    await eliminarPermisos({ id_usuario: p.id });
    dataPermisos.forEach(async (item) => {
      if (item.check) {
        let parametrospermisos = {
          id_usuario: p.id,
          idmodulo: item.id,
        };
        await insertarPermisos(parametrospermisos);
      }
    });

    const { mostrarpersonal } = get();
    set(mostrarpersonal({ id_empresa: idEmpresa }));
  },
  buscarpersonal: async (p) => {
    const res = await buscarPersonal(p);
    set({ datapersonal: res });
  },

  mostrarmodulo: async () => {
    const res = await mostrarModulos();
    set({ datamodulo: res });
    return res;
  },
  datapermisos: [],
  datapermisospersonal: [],
  itemmenuconfiguracion: [],
  mostrarpermisos: async (p) => {
    const res = await mostrarPermisos(p);
    set({ datapermisos: res });

    let allDocs = [];
    DataModulosConfiguracion.map((item, index) => {
      const statePermisos = res?.some((obj) =>
        obj.modulos.nombre.includes(item.title)
      );

      allDocs.push({ ...item, state: statePermisos ? true : false });
    });

    set({ itemmenuconfiguracion: allDocs });
    return res;
  },
  mostrarpermisospersonal: async (p) => {
    const res = await mostrarPermisos(p);
    set({ datapermisospersonal: res });
    return res;
  },

}));
