import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { usePersonalStore } from "../store/PersonalStore";
import { BloqueoPagina } from "../components/moleculas/BloqueoPagina";
import { ReportesTemplate } from "../components/template/ReportesTemplate";
import { useKardexStore } from "../store/KardexStore";

export const Reportes = () => {
  const { mostrarKardex, dataKardex } = useKardexStore();
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

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return bloqueoPagina ? (
    <ReportesTemplate/>
  ) : (
    <BloqueoPagina />
  );
};
