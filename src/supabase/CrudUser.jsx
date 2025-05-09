import Swal from "sweetalert2";
import { SUPABASE } from "./SupaBase.config";
import { obtenerIdAuthSupabase } from "./GlobalSupaBase";

export const insertUser = async (dataUser) => {
  console.log(dataUser);
  
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

export const viewUser = async () => {
  const idAuthSupaBase = await obtenerIdAuthSupabase();
  const { data, error } = await SUPABASE.from("usuarios")
    .select()
    .eq("idauth", idAuthSupaBase)
    .maybeSingle();
  
    if(data){
      return data;
    }
};
