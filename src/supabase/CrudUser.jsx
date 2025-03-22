import Swal from "sweetalert2";
import { SUPABASE } from "./SupaBase.config";

export const insertUser = async (dataUser) => {
  //maybesingle retorna un solo valor
  const { data, error } = await SUPABASE.from("usuarios")
    .insert(dataUser)
    .select()
    .maybeSingle();

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al registrar usuario " + error.message,
    });
  }
  if (data) return data;
};
