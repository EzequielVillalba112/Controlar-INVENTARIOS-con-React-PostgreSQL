import styled from "styled-components";
import { V } from "../../styles/Variables";
import { CardDatosEmpresa } from "../moleculas/CardDatosEmpresa";
import { useEmpresaStore } from "../../store/EmpresaStore";

export const BannerEmpresa = () => {
  const { dataEmpresa,cantidadUsuarios } = useEmpresaStore();

  return (
    <Container>
      <div className="container-wrapper-context">
        <span className="titulo">
          {<V.iconoempresa />}
          {dataEmpresa?.nombre}
        </span>
        <ContentCard>
          <CardDatosEmpresa title="Moneda" value={dataEmpresa?.simbolomoneda} />
          <CardDatosEmpresa title="Usuarios" value={cantidadUsuarios} />
        </ContentCard>
      </div>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0 solid #b8b8b8;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat, repeat;
  border-radius: 16px;
  overflow: hidden;
  .titulo,
  .content-text {
    display: flex;
    justify-content: center;
    font-size: 1.6rem;
    gap: 5px;
    font-weight: 600;
  }
`;

const ContentCard = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  cursor: pointer;
`;
