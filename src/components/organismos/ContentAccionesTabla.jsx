import styled from "styled-components";
import { AccionTabla } from "../atomos/AccionTabla";
import { V } from "../../styles/Variables";

export const ContentAccionesTabla = ({ funcionEditar, funcionEliminar }) => {
  return (
    <Container>
      <AccionTabla
        funcion={funcionEditar}
        color="#4fad02"
        icono={<V.iconeditarTabla />}
        fontSize="20px"
      />
      <AccionTabla
        funcion={funcionEliminar}
        color="#be0000"
        icono={<V.iconeliminarTabla />}
        fontSize="20px"
      />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  @media(max-width: 48em){
    justify-content: end;
  }
`;
