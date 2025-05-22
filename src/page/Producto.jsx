import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { ProductoTemplate } from "../components/template/ProductoTemplate";
import { useProductoStore } from "../store/ProductoStore";
import { useMarcaStore } from "../store/MarcaStore";
import { useCategoriaStore } from "../store/CategoriaStore";
import { usePersonalStore } from "../store/PersonalStore";
import { BloqueoPagina } from "../components/moleculas/BloqueoPagina";

export const Producto = () => {
  const { mostrarProducto, dataProducto, buscarProducto, buscador } =
    useProductoStore();
  const { mostrarMarca } = useMarcaStore();
  const { dataEmpresa } = useEmpresaStore();
  const { mostrarCategoria } = useCategoriaStore();
  const { datapermisos } = usePersonalStore();

  const bloqueoPagina = datapermisos.some((obj) =>
    obj.modulos.nombre.includes("Productos")
  );

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar producto", { _id_empresa: dataEmpresa?.id }],
    queryFn: () => mostrarProducto({ _id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });

  console.log(dataProducto);
  
  const { data: buscarData } = useQuery({
    queryKey: [
      "buscar producto",
      { _id_empresa: dataEmpresa?.id, buscador: buscador },
    ],
    queryFn: async () => {
      const result = await buscarProducto({
        _id_empresa: dataEmpresa?.id,
        buscador: buscador,
      });
      return result ?? [];
    },
    enabled: dataEmpresa?.id != null,
  });

  const { data: datamarca } = useQuery({
    queryKey: ["mostrar marca", { id_empresa: dataEmpresa?.id }],
    queryFn: () => mostrarMarca({ id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });

  const { data: datacategoria } = useQuery({
    queryKey: ["mostrar categorias", { id_empresa: dataEmpresa?.id }],
    queryFn: () => mostrarCategoria({ id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return bloqueoPagina ? <ProductoTemplate data={dataProducto} /> : <BloqueoPagina />;
};
