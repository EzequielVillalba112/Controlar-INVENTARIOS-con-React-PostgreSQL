import { SUPABASE } from "./SupaBase.config";
import Swal from "sweetalert2";

export async function insertarMarca(p) {
  const { error } = await SUPABASE.rpc("insertarmarca", p);
  console.log(error);

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
  // Verificar si ya existe otra marca con el mismo nombre
  const { data: existente, error: errorSelect } = await SUPABASE.from("marca")
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
      text: "Ya existe una marca con ese nombre.",
    });
    return;
  }

  const { error } = await SUPABASE.from("marca").update(p).eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  } else {
    Swal.fire({
      title: "Marca editada con éxito.",
      icon: "success",
      draggable: true,
    });
  }
}

export async function buscarMarca(p) {
  const { data } = await SUPABASE.from("marca")
    .select()
    .eq("id_empresa", p.id_empresa)
    .ilike("descripcion", "%" + p.descripcion + "%");

  return data;
}
