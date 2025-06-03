import { SUPABASE } from "./SupaBase.config";
import Swal from "sweetalert2";

export async function insertarKardex(p) {
  const { error } = await SUPABASE.from("kardex").insert(p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}

export async function mostrarKardex(p) {
  const { data } = await SUPABASE.rpc("mostrarkardexempres", p).order("id", {
    ascending: false,
  });
  return data;
}

export async function anularKardex(p) {
  const { data } = await SUPABASE.rpc("anular_kardex", p);
  return data;
}

export async function buscarKardex(p) {
  const { data } = await SUPABASE.rpc("buscarkardexempres", p);
  return data;
}
