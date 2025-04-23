import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { ProductoTemplate } from "../components/template/ProductoTemplate";
import { useProductoStore } from "../store/ProductoStore";
import { useMarcaStore } from "../store/MarcaStore";

export const Producto = () => {
  const { mostrarProducto, dataProducto, buscarProducto, buscador } =
    useProductoStore();
  const { mostrarMarca } = useMarcaStore();
  const { dataEmpresa } = useEmpresaStore();

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar producto", { id_empresa: dataEmpresa?.id }],
    queryFn: () => mostrarProducto({ id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });
  const { data: buscarData } = useQuery({
    queryKey: [
      "buscar producto",
      { id_empresa: dataEmpresa?.id, descripcion: buscador },
    ],
    queryFn: async () => {
      const result = await buscarProducto({
        id_empresa: dataEmpresa?.id,
        descripcion: buscador,
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

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return <ProductoTemplate data={dataProducto} />;
};
