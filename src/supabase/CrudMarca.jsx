import { SUPABASE } from "./SupaBase.config";
import Swal from "sweetalert2";

export async function insertarMarca(p) {
  const { error } = await SUPABASE.rpc("insertarMarca", p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}

export async function mostrarMarca(p) {
  const { data } = await SUPABASE.from("marca")
    .select()
    .eq("id_empresa", p.id_empresa)
    .order("id", { ascending: true });
  return data;
}

export async function eliminarMarca(p) {
  const { error } = await SUPABASE.from("marca").delete().eq("id", p.id);

  if (error) {
    alert("Error al eliminar ", error.message);
  }
}

export async function editarMarca(p) {
  const { error } = await SUPABASE.from("marca").update(p).eq("id", p.id);

  if (error) {
    alert("Error al editar ", error.message);
  }
}

export async function buscarMarca(p) {
  const { data } = await SUPABASE.from("marca")
    .select()
    .eq("id_empresa", p.id_empresa)
    .ilike("descripcion", "%" + p.descripcion + "%");

  return data;
}
