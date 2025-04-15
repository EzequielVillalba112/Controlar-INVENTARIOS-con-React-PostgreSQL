import styled from "styled-components";
import { useState } from "react";
import { Header } from "../organismos/Header";
import { TablaMarca } from "../organismos/tablas/TablaMarca";
import { RegistrarMarca } from "../organismos/formularios/RegistrarMarca";
import { BtnFiltro } from "../moleculas/BtnFiltro";
import { ContentFiltro } from "../atomos/ContentFiltro";
import { Title } from "../atomos/Title";
import { V } from "../../styles/Variables";
export function MarcaTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, setOpenRegistro] = useState(false);

  const nuevoRegistro = () =>{
    setOpenRegistro(!openRegistro);
    setAccion("Nuevo");
    setDataSelect([]);
  }

  return (
    <Container>
      {openRegistro && (
        <RegistrarMarca
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => setOpenRegistro(!openRegistro)}
        />
      )}
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Marcas</Title>
          <BtnFiltro bgColor="#ffffff" textColor="#ffffff" icono={<V.agregar/>} funcion={nuevoRegistro}/>
        </ContentFiltro>
      </section>
      <section className="area2"></section>
      <section className="main">
        <TablaMarca data={data} />
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 100px
    "main" auto;
  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    display: flex;
    align-items: center;
  }
  .main {
    grid-area: main;
  }
`;
