import { useQuery } from "@tanstack/react-query";
import { MarcaTemplate } from "../components/template/MarcaTemplate";
import { useEmpresaStore } from "../store/EmpresaStore";
import { useMarcaStore } from "../store/MarcaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";

export const Marca = () => {
  const { mostrarMarca, dataMarca, buscarMarca, buscador } = useMarcaStore();
  const { dataEmpresa } = useEmpresaStore();

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar marca", { id_empresa: dataEmpresa?.id }],
    queryFn: () => mostrarMarca({ id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });
  const { data: buscarData } = useQuery({
    queryKey: [
      "buscar marca",
      { id_empresa: dataEmpresa.empresa?.id, descripcion: buscador },
    ],
    queryFn: () =>
      buscarMarca({ id_empresa: dataEmpresa.empresa?.id, descripcion: buscador }),
    enabled: dataEmpresa.empresa?.id != null,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return <MarcaTemplate data={dataMarca}/>;
};
