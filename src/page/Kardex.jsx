import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore } from "../store/EmpresaStore";
import { useMarcaStore } from "../store/MarcaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { usePersonalStore } from "../store/PersonalStore";
import { BloqueoPagina } from "../components/moleculas/BloqueoPagina";
import { KardexTemplate } from "../components/template/KardexTemplate";
import { useKardexStore } from "../store/KardexStore";

export const Kardex = () => {
  const { mostrarKardex, dataKardex, buscarMarca, buscador } = useKardexStore();
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

  return bloqueoPagina ? <KardexTemplate data={dataKardex} /> : <BloqueoPagina />;
};
