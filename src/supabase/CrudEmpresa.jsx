import { SUPABASE } from "./SupaBase.config";

export const viewEmpresa = async (p) => {
  const { data, error } = await SUPABASE.from("asignarempresa")
    .select(`empresa(id,nombre,simbolomoneda)`)
    .eq("id_usuario", p.idUser)
    .maybeSingle();

  if (data) {
    return data;
  }
};

export const contarUsuarioXempresa = async (p) => {
  const { data, error } = await SUPABASE.rpc("count_users_by_company", {
    p_company_id: parseInt(p.id_empresa),
  });

  if (error) {
    console.error(error.details);
    return 0;
  }

  return data ?? 0;
};
