import { SUPABASE } from "./SupaBase.config";
import Swal from "sweetalert2";

export async function insertarProducto(p) {
  const { error } = await SUPABASE.rpc("insertarproducto", p);
  console.log(error);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}

export async function mostrarProducto(p) {
  const { data } = await SUPABASE.from("productos")
    .select()
    .eq("id_empresa", p.id_empresa)
    .order("id", { ascending: true });
  return data;
}

export async function eliminarProducto(p) {
  const { error } = await SUPABASE.from("productos").delete().eq("id", p.id);

  if (error) {
    alert("Error al eliminar ", error.message);
  }
}

export async function editarProducto(p) {
  // Verificar si ya existe otra Producto con el mismo nombre
  const { data: existente, error: errorSelect } = await SUPABASE.from("productos")
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
      text: "Ya existe una Producto con ese nombre.",
    });
    return;
  }

  const { error } = await SUPABASE.from("productos").update(p).eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  } else {
    Swal.fire({
      title: "Producto editada con éxito.",
      icon: "success",
      draggable: true,
    });
  }
}

export async function buscarProducto(p) {
  const { data } = await SUPABASE.from("productos")
    .select()
    .eq("id_empresa", p.id_empresa)
    .ilike("descripcion", "%" + p.descripcion + "%");

  return data;
}
