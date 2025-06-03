import styled from "styled-components";
import { useState } from "react";
import { Header } from "../organismos/Header";
import { ContentFiltro } from "../atomos/ContentFiltro";
import { Title } from "../atomos/Title";
import { Buscador } from "../organismos/Buscador";
import { Btnsave } from "../moleculas/BtnSave";
import { Tabs } from "../organismos/Tabs";
import { RegistrarKardex } from "../organismos/formularios/RegistrarKardex";
import { useKardexStore } from "../../store/KardexStore";

export function KardexTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, setOpenRegistro] = useState(false);

  const [tipo, setTipo] = useState();

  const { setBuscador } = useKardexStore();

  const nuevoEntrada = () => {
    setOpenRegistro(!openRegistro);
    setTipo("Entrada");
  };

  const nuevaSalida = () => {
    setOpenRegistro(!openRegistro);
    setTipo("Salida");
  };

  return (
    <Container>
      {openRegistro && (
        <RegistrarKardex
          dataSelect={dataSelect}
          accion={accion}
          tipo={tipo}
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
          <Title>Kardex</Title>
          <Btnsave
            bgcolor="#1C7A7D"
            titulo="+ Entrada"
            funcion={nuevoEntrada}
            textColor="#fff"
          />
          <Btnsave
            bgcolor="#be3232"
            titulo="- Salida"
            funcion={nuevaSalida}
            textColor="#fff"
          />
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        <Tabs data={data}/>
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
