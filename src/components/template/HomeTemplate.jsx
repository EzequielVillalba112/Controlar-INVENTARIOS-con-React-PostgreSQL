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
        <Title>Tu empresa </Title>
      </section>
      <section className="area2"></section>
      <section className="main">
        <BannerEmpresa/>
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
    "area2" 100px
    "main" auto;

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    background-color: #586979;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .area2 {
    grid-area: area2;
    background-color: #05345e;
    display: flex;
    align-items: center;
  }
  .main {
    grid-area: main;
    background-color: #068bff;
    display: flex;
    align-items: center;
  }
`;
