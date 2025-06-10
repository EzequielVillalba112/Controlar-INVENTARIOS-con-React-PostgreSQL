import { SUPABASE } from "./SupaBase.config";
import Swal from "sweetalert2";

export async function insertarProducto(p) {
  const { error } = await SUPABASE.rpc("insertarproducto", p);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}

export async function mostrarProducto(p) {
  const { data } = await SUPABASE.rpc("mostrarproductos", p);

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
  const { data: existente, error: errorSelect } = await SUPABASE.from(
    "productos"
  )
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
  const { data } = await SUPABASE.rpc("buscarproductos", p);

  return data;
}
//Reportes
export async function reporteStockTodos(p) {
  const { error, data } = await SUPABASE.from("productos")
    .select()
    .eq("id_empresa", p.id_empresa);

  if (error) return;

  return data;
}

export async function reporteStockProductoId(p) {
  const { error, data } = await SUPABASE.from("productos")
    .select()
    .eq("id_empresa", p.id_empresa)
    .eq("id", p.id);

  if (error) return;

  return data;
}

export async function reportStockBajoMinimo(p) {
  const { data, error } = await SUPABASE.rpc("reportproductosbajominimos", p);
  if (error) {
    console.error("Error en RPC:", error);
    return [];
  }
  return data ?? [];
}

export async function reportKardexEntradaSalida(p) {
  const { data, error } = await SUPABASE.rpc("mostrarkardexempresa", {
    _id_empresa: p._id_empresa,
    _id_producto: p._id_producto,
  });

  if (error) {
    console.error("Error en RPC:", error);
    return [];
  }

  return data ?? [];
}

export async function reportInventarioValorado(p) {
  const { data, error } = await SUPABASE.rpc("inventariovalorado", p);
  if (error) {
    console.error("Error en RPC:", error);
    return [];
  }

  return data ?? [];
}
