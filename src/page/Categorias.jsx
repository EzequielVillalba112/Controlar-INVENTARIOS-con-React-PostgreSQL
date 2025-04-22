import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { CategoriaTemplate } from "../components/template/CategoriaTemplate";
import { useCategoriaStore } from "../store/CategoriaStore";

export const Categorias = () => {
  const { mostrarCategoria, dataCategoria, buscarCategoria, buscador } = useCategoriaStore();
  const { dataEmpresa } = useEmpresaStore();

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar categorias", { id_empresa: dataEmpresa?.id }],
    queryFn: () => mostrarCategoria({ id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });
  const { data: buscarData } = useQuery({
    queryKey: [
      "buscar categorias",
      { id_empresa: dataEmpresa?.id, descripcion: buscador },
    ],
    queryFn: async () => {
      const result = await buscarCategoria({ id_empresa: dataEmpresa?.id, descripcion: buscador });
      return result ?? []; 
    },
    enabled: dataEmpresa?.id != null,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return <CategoriaTemplate data={dataCategoria}/>;
};
