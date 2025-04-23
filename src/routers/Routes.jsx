import { Routes, Route } from "react-router-dom";
import { Home } from "../page/Home";
import { Login } from "../page/Login";
import { ProtectedRutes } from "../hooks/ProtectedRutes";
import { userAuth } from "../context/AuthContext";
import { useUserStore } from "../store/UserStore";
import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { ErrorMolecula } from "../components/moleculas/ErrorMolecula";
import { useEmpresaStore } from "../store/EmpresaStore";
import { Configuracion } from "../page/Configuracion";
import { Marca } from "../page/Marca";
import { Categorias } from "../page/Categorias";
import { Producto } from "../page/Producto";

export const MyRoutes = () => {
  const { user } = userAuth();
  const { mostrarUsuario, idUsuario } = useUserStore();
  const { mostrarEmpresa } = useEmpresaStore();
  const {
    data: dataUsuario,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Mostrar usuario"],
    queryFn: mostrarUsuario,
  });
  const { data: dataEmpres } = useQuery({
    queryKey: ["Data empresa"],
    queryFn: () => mostrarEmpresa({ idUser: idUsuario }),
    enabled: !!dataUsuario,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return <ErrorMolecula message={error.message} />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRutes user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuracion/>} />
        <Route path="/configurar/marca" element={<Marca/>} />
        <Route path="/configurar/categorias" element={<Categorias/>}/>
        <Route path="/configurar/productos" element={<Producto/>}/>
      </Route>
    </Routes>
  );
};
