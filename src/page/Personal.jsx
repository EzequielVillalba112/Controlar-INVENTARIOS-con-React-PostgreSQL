import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore } from "../store/EmpresaStore";
import { useMarcaStore } from "../store/MarcaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { PersonalTemplate } from "../components/template/PersonaTemplate";
import { usePersonalStore } from "../store/PersonalStore";

export const Personal = () => {
  const {
    mostrarpersonal,
    datapersonal,
    buscarpersonal,
    mostrarmodulo,
    buscador,
  } = usePersonalStore();
  const { dataEmpresa } = useEmpresaStore();

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

  return <PersonalTemplate data={datapersonal} />;
};
