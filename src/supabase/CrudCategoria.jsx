import { SUPABASE } from "./SupaBase.config";
import Swal from "sweetalert2";

export async function insertarCategoria(p) {
  const { error } = await SUPABASE.rpc("insertarcategorias", p);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}

export async function mostrarCategoria(p) {
  const { data } = await SUPABASE.from("categoria")
    .select()
    .eq("id_empresa", p.id_empresa)
    .order("id", { ascending: true });
  return data;
}

export async function eliminarCategoria(p) {
  const { error } = await SUPABASE.from("categoria").delete().eq("id", p.id);

  if (error) {
    alert("Error al eliminar ", error.message);
  }
}

export async function editarCategoria(p) {
  // Verificar si ya existe otra categoria con el mismo nombre
  const { data: existente, error: errorSelect } = await SUPABASE.from("categoria")
    .select("id")
    .eq("descripcion", p.descripcion)
    .neq("id", p.id);

  if (errorSelect) {
    Swal.fire({
      icon: "error",
      title: "Error al verificar duplicados",
      text: errorSelect.message,
    });
    return;
  }

  if (existente.length > 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ya existe una categoria con ese nombre.",
    });
    return;
  }

  const { error } = await SUPABASE.from("categoria").update(p).eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  } else {
    Swal.fire({
      title: "categoria editada con éxito.",
      icon: "success",
      draggable: true,
    });
  }
}

export async function buscarCategoria(p) {
  const { data } = await SUPABASE.from("categoria")
    .select()
    .eq("id_empresa", p.id_empresa)
    .ilike("descripcion", "%" + p.descripcion + "%");

  return data;
}
