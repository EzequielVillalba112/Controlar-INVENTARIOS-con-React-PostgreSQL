import styled from "styled-components";
import { Header } from "../organismos/Header";
import { useState } from "react";
import { Title } from "../atomos/Title";
import { BannerEmpresa } from "../organismos/BannerEmpresa";

export const HomeTemplate = () => {
  const [state, setState] = useState(false);

  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <Title style={{marginRight:"10px"}}>Tu empresa </Title>
      </section>
      <section className="main">
        <BannerEmpresa />
      </section>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 15px;
  position: relative;
  background-color: ${({ theme }) => theme.bgfondo};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "area1" 100px
    "main" auto;
  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }
 
  .area1 {
    grid-area: area1;
    background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path d='M 20 0 L 0 0 0 20' fill='none' stroke='rgba(0, 0, 0, 0.2)' stroke-width='2'/></svg>");
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
    background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path d='M 20 0 L 0 0 0 20' fill='none' stroke='rgba(0, 0, 0, 0.2)' stroke-width='2'/></svg>");
    display: flex;
    align-items: center;
  }
`;
