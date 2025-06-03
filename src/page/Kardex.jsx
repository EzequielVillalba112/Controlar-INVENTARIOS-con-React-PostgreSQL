import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { usePersonalStore } from "../store/PersonalStore";
import { BloqueoPagina } from "../components/moleculas/BloqueoPagina";
import { KardexTemplate } from "../components/template/KardexTemplate";
import { useKardexStore } from "../store/KardexStore";
import { useProductoStore } from "../store/ProductoStore";

export const Kardex = () => {
  const {
    mostrarKardex,
    dataKardex,
    buscarKardex,
    buscador: buscadorKardex,
  } = useKardexStore();
  
  const { buscarProducto, buscador: buscadorProducto } = useProductoStore();
  const { dataEmpresa } = useEmpresaStore();
  const { datapermisos } = usePersonalStore();

  const bloqueoPagina = datapermisos.some((obj) =>
    obj.modulos.nombre.includes("Marca de productos")
  );

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Kardex", { _id_empresa: dataEmpresa?.id }],
    queryFn: () => mostrarKardex({ _id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });
  //busca en lista de producto para form entrada salida de kardex
  const { data: buscarData } = useQuery({
    queryKey: [
      "buscar producto",
      { _id_empresa: dataEmpresa?.id, buscador: buscadorProducto },
    ],
    queryFn: async () => {
      const result = await buscarProducto({
        _id_empresa: dataEmpresa?.id,
        buscador: buscadorProducto,
      });
      return result ?? [];
    },
    enabled: dataEmpresa?.id != null,
  });
  //busca en lista de kardex
  const { data: buscarDataKardex } = useQuery({
    queryKey: [
      "buscar kardex",
      { _id_empresa: dataEmpresa?.id, buscador: buscadorKardex },
    ],
    queryFn: async () => {
      const result = await buscarKardex({
        _id_empresa: dataEmpresa?.id,
        buscador: buscadorKardex,
      });
      return result ?? [];
    },
    enabled: dataEmpresa?.id != null,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return bloqueoPagina ? (
    <KardexTemplate data={dataKardex} />
  ) : (
    <BloqueoPagina />
  );
};
