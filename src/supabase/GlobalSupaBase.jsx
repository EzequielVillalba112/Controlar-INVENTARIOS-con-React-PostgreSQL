import { SUPABASE } from "./SupaBase.config";

export const obtenerIdAuthSupabase = async () => {
  const {
    data: { session },
  } = await SUPABASE.auth.getSession();
  if (session != null) {
    const { user } = session;
    const idAuthSupaBase = user.id;
    return idAuthSupaBase;
  }
};
