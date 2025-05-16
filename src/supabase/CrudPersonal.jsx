import { SUPABASE } from "./SupaBase.config";
import Swal from "sweetalert2";

export async function mostrarPersonal(p) {
  const { data, error } = await SUPABASE.rpc("mostrarpersonal", p);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
  return data;
}

export async function eliminarPersonal(p) {
  const { error } = await SUPABASE.from("usuarios").delete().eq("id", p.id);

  if (error) {
    alert("Error al eliminar ", error.message);
    console.log(error);
    
  }
}

export async function editarPersonal(p) {
  // Verificar si ya existe otra Personal con el mismo nombre
  const { data: existente, error: errorSelect } = await SUPABASE.from(
    "usuarios"
  )
    .select("id")
    .eq("nombre", p.descripcion)
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
      text: "Ya existe una Personal con ese nombre.",
    });
    return;
  }

  const { error } = await SUPABASE.from("usuarios").update(p).eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  } else {
    Swal.fire({
      title: "Personal editada con éxito.",
      icon: "success",
      draggable: true,
    });
  }
}

export async function buscarPersonal(p) {
   const { data, error } = await SUPABASE.rpc("buscarpersonal", p);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
  return data;
}

export const insertarAsignacion = async (p) => {
  const { error } = await SUPABASE.from("asignarempresa").insert(p);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al insertat asignacion " + error.message,
    });
  }
};

export const insertarPermisos = async (p) => {
  const { error } = await SUPABASE.from("permisos").insert(p);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al insertat permisos " + error.message,
    });
  }
};

export const mostrarPermisos = async (p) => {
  const { data, error } = await SUPABASE.from("permisos")
    .select(`id, id_usuario,idmodulo, modulos(nombre)`)
    .eq("id_usuario", p.id_usuario);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al mostrar permisos 10" + error.message,
    });
  }

  return data;
};

export const eliminarPermisos = async (p) => {
  const { error } = await SUPABASE.from("permisos")
    .delete()
    .eq("id_usuario", p.id_usuario);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al eliminar permisos " + error.message,
    });
  }
};

export const mostrarModulos = async () =>{
  const {error, data} = await SUPABASE.from("modulos").select();
  
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al mostrar modulos " + error.message,
    });
  }
  return data;
}