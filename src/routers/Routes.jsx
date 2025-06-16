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
import { Personal } from "../page/Personal";
import { usePersonalStore } from "../store/PersonalStore";
import { Kardex } from "../page/Kardex";
import { Reportes } from "../page/Reportes";
import { StockActualTodos } from "../components/organismos/report/StockActualTodos";
import { StockActualPorProducto } from "../components/organismos/report/StockActualPorProducto";
import { StockBajoMinimo } from "../components/organismos/report/StockBajoMinimo";
import { KardexEntradaSalidas } from "../components/organismos/report/KardexEntradaSalidas";
import { InventarioValorado } from "../components/organismos/report/InventarioValorado";

export const MyRoutes = () => {
  const { user } = userAuth();
  const { mostrarUsuario, idUsuario } = useUserStore();
  const { mostrarEmpresa } = useEmpresaStore();
  const { datapermisos, mostrarpermisos } = usePersonalStore();
  const {
    data: dataUsuario,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Mostrar usuario"],
    queryFn: mostrarUsuario,
  });
  const { data: dataEmpres } = useQuery({
    queryKey: ["Data empresa", idUsuario],
    queryFn: () => mostrarEmpresa({ idUser: idUsuario }),
    enabled: !!dataUsuario,
  });

  const { data: dataPermisos } = useQuery({
    queryKey: ["Data permisos"],
    queryFn: () => mostrarpermisos({ id_usuario: idUsuario }),
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
        <Route path="/configurar" element={<Configuracion />} />
        <Route path="/configurar/marca" element={<Marca />} />
        <Route path="/configurar/categorias" element={<Categorias />} />
        <Route path="/configurar/productos" element={<Producto />} />
        <Route path="/configurar/usuarios" element={<Personal />} />
        <Route path="/kardex" element={<Kardex />} />
        <Route path="/reportes" element={<Reportes />}>
          <Route path="stock-actual-todo" element={<StockActualTodos />} />
          <Route
            path="stock-actual-por-producto"
            element={<StockActualPorProducto />}
          />
          <Route path="stock-bajo-minimo" element={<StockBajoMinimo />} />
          <Route
            path="kardex-entradas-salidas"
            element={<KardexEntradaSalidas />}
          />
          <Route path="inventario-valorado" element={<InventarioValorado />} />
        </Route>
      </Route>
      {/*<Route path="/" element={<Home />} />*/}
      {/* <Route path="/configurar" element={<Configuracion />} />
      <Route path="/configurar/marca" element={<Marca />} />
      <Route path="/configurar/categorias" element={<Categorias />} />
      <Route path="/configurar/productos" element={<Producto />} />
      <Route path="/configurar/usuarios" element={<Personal />} />
      <Route path="/kardex" element={<Kardex />} />
      <Route path="/reportes" element={<Reportes />}>
        <Route path="stock-actual-todo" element={<StockActualTodos />} />
        <Route
          path="stock-actual-por-producto"
          element={<StockActualPorProducto />}
        />
        <Route path="stock-bajo-minimo" element={<StockBajoMinimo />} />
        <Route
          path="kardex-entradas-salidas"
          element={<KardexEntradaSalidas />}
        />
        <Route path="inventario-valorado" element={<InventarioValorado />} />
      </Route> */}
    </Routes>
  );
};
