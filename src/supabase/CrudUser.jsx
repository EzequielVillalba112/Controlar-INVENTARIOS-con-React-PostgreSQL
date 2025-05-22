import Swal from "sweetalert2";
import { SUPABASE } from "./SupaBase.config";
import { obtenerIdAuthSupabase } from "./GlobalSupaBase";

export const insertUser = async (dataUser) => {
  try {
    const { data, error } = await SUPABASE.from("usuarios")
      .insert(dataUser)
      .select()
      .maybeSingle();

    if (error) throw new Error("Error al insertar usuario: " + error.message);

    return data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.message,
    });
  }
};

export const viewUser = async () => {
  const idAuthSupaBase = await obtenerIdAuthSupabase();
  const { data, error } = await SUPABASE.from("usuarios")
    .select()
    .eq("idauth", idAuthSupaBase)
    .maybeSingle();

  if (data) {
    return data;
  }
};
