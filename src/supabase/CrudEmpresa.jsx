import { SUPABASE } from "./SupaBase.config";
import { obtenerIdAuthSupabase } from "./GlobalSupaBase";

export const viewEmpresa = async (p) => {
  const { data, error } = await SUPABASE.from("asignarempresa")
    .select(`empresa(id,nombre,simbolomoneda)`)
    .eq("id_usuario", p.idUser)
    .maybeSingle();

  if (data) {
    return data;
  }
};
