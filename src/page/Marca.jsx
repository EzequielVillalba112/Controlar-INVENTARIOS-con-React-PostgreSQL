import { useQuery } from "@tanstack/react-query";
import { MarcaTemplate } from "../components/template/MarcaTemplate";
import { useEmpresaStore } from "../store/EmpresaStore";
import { useMarcaStore } from "../store/MarcaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { usePersonalStore } from "../store/PersonalStore";
import { BloqueoPagina } from "../components/moleculas/BloqueoPagina";

export const Marca = () => {
  const { mostrarMarca, dataMarca, buscarMarca, buscador } = useMarcaStore();
  const { dataEmpresa } = useEmpresaStore();
  const { datapermisos } = usePersonalStore();

  const bloqueoPagina = datapermisos.some((obj) =>
    obj.modulos.nombre.includes("Marca de productos")
  );

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar marca", { id_empresa: dataEmpresa?.id }],
    queryFn: () => mostrarMarca({ id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });
  const { data: buscarData } = useQuery({
    queryKey: [
      "buscar marca",
      { id_empresa: dataEmpresa?.id, descripcion: buscador },
    ],
    queryFn: async () => {
      const result = await buscarMarca({
        id_empresa: dataEmpresa?.id,
        descripcion: buscador,
      });
      return result ?? [];
    },
    enabled: dataEmpresa?.id != null,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return bloqueoPagina ? <MarcaTemplate data={dataMarca} /> : <BloqueoPagina />;
};
