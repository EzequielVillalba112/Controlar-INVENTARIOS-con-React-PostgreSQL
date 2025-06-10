import styled from "styled-components";
import { useState } from "react";
import { BtnFiltro } from "../moleculas/BtnFiltro";
import { ContentFiltro } from "../atomos/ContentFiltro";
import { Title } from "../atomos/Title";
import { V } from "../../styles/Variables";
import { Buscador } from "../organismos/Buscador";
import { TablaProducto } from "../organismos/tablas/TablaProducto";
import { RegistrarProducto } from "../organismos/formularios/RegistrarProducto";
import { useProductoStore } from "../../store/ProductoStore";
export function ProductoTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, setOpenRegistro] = useState(false);

  const { setBuscador } = useProductoStore();

  const nuevoRegistro = () => {
    setOpenRegistro(!openRegistro);
    setAccion("Nuevo");
    setDataSelect([]);
  };

  return (
    <Container>
      {openRegistro && (
        <RegistrarProducto
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => setOpenRegistro(!openRegistro)}
        />
      )}
      <section className="area1">
        <ContentFiltro>
          <Title>Productos</Title>
          <BtnFiltro
            bgColor="#ffffff"
            textColor="#ffffff"
            icono={<V.agregar />}
            funcion={nuevoRegistro}
          />
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        <TablaProducto
          data={data}
          setOpenRegistro={setOpenRegistro}
          setDataSelect={setDataSelect}
          setAccion={setAccion}
        />
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
