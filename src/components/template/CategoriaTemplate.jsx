import styled from "styled-components";
import { useState } from "react";
import { Header } from "../organismos/Header";
import { BtnFiltro } from "../moleculas/BtnFiltro";
import { ContentFiltro } from "../atomos/ContentFiltro";
import { Title } from "../atomos/Title";
import { V } from "../../styles/Variables";
import { Buscador } from "../organismos/Buscador";
import { useMarcaStore } from "../../store/MarcaStore";
import { RegistrarCategoria } from "../organismos/formularios/RegistrarCategoria";
import { TablaCategoria } from "../organismos/tablas/TablaCategoria";
import { useCategoriaStore } from "../../store/CategoriaStore";

export function CategoriaTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, setOpenRegistro] = useState(false);

  const {setBuscador} = useCategoriaStore();

  const nuevoRegistro = () =>{
    setOpenRegistro(!openRegistro);
    setAccion("Nuevo");
    setDataSelect([]);
  }

  return (
    <Container>
      {openRegistro && (
        <RegistrarCategoria
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
          <Title>Categorias</Title>
          <BtnFiltro bgColor="#ffffff" textColor="#ffffff" icono={<V.agregar/>} funcion={nuevoRegistro}/>
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador}/>
      </section>
      <section className="main">
        <TablaCategoria data={data} setOpenRegistro={setOpenRegistro} setDataSelect={setDataSelect} setAccion={setAccion}/>
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
    justify-content: end;
    align-items: center;
  }
  .main {
    grid-area: main;
  }
`;
