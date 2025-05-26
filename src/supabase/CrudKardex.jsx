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
  const { data } = await SUPABASE.rpc("mostrarkardexempres", p).order("id",{ascending:false});
  return data;
}

export async function eliminarKardex(p) {
  const { error } = await SUPABASE.from("Kardex").delete().eq("id", p.id);

  if (error) {
    alert("Error al eliminar ", error.message);
  }
}

export async function editarKardex(p) {
  // Verificar si ya existe otra Kardex con el mismo nombre
  const { data: existente, error: errorSelect } = await SUPABASE.from("Kardex")
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
      text: "Ya existe una Kardex con ese nombre.",
    });
    return;
  }

  const { error } = await SUPABASE.from("Kardex").update(p).eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  } else {
    Swal.fire({
      title: "Kardex editada con éxito.",
      icon: "success",
      draggable: true,
    });
  }
}

export async function buscarKardex(p) {
  const { data } = await SUPABASE.from("Kardex")
    .select()
    .eq("id_empresa", p.id_empresa)
    .ilike("descripcion", "%" + p.descripcion + "%");

  return data;
}
