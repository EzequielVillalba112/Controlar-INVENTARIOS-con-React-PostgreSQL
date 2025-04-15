import { useQuery } from "@tanstack/react-query";
import { HomeTemplate } from "../components/template/HomeTemplate";
import { useEmpresaStore } from "../store/EmpresaStore";

export const Home = () => {
  const { contarUsuarioXempresa, dataEmpresa } = useEmpresaStore();
  const { data } = useQuery({
    queryKey: ["Usuarios por empresa"],
    queryFn: () =>
      contarUsuarioXempresa({ id_empresa: dataEmpresa?.id }),
    enabled: !!dataEmpresa,
  });

  return <HomeTemplate />;
};
