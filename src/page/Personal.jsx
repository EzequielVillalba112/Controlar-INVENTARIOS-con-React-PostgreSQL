import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { PersonalTemplate } from "../components/template/PersonaTemplate";
import { usePersonalStore } from "../store/PersonalStore";
import { BloqueoPagina } from "../components/moleculas/BloqueoPagina";

export const Personal = () => {
  const {
    mostrarpersonal,
    datapersonal,
    buscarpersonal,
    mostrarmodulo,
    buscador,
    datapermisos,
  } = usePersonalStore();
  const { dataEmpresa } = useEmpresaStore();
  const bloqueoPagina = datapermisos.some((obj) =>
    obj.modulos.nombre.includes("Personal")
  );

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar personal", { id_empresa: dataEmpresa?.id }],
    queryFn: () => mostrarpersonal({ id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });

  const { data: mostrarModulo } = useQuery({
    queryKey: ["mostrar modulo"],
    queryFn: () => mostrarmodulo(),
    enabled: dataEmpresa?.id != null,
  });

  const { data: buscarData } = useQuery({
    queryKey: [
      "buscar usuario",
      { id_empresa: dataEmpresa?.id, buscador: buscador },
    ],
    queryFn: async () => {
      const result = await buscarpersonal({
        id_empresa: dataEmpresa?.id,
        buscador: buscador,
      });
      return result ?? [];
    },
    enabled: dataEmpresa?.id != null,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return bloqueoPagina ? (
    <PersonalTemplate data={datapersonal} />
  ) : (
    <BloqueoPagina />
  );
};
