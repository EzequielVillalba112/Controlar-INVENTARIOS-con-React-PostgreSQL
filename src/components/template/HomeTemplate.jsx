import styled from "styled-components";

export const HomeTemplate = () => {
  return (
    <Container>
      <header className="header"></header>
      <section className="area1"></section>
      <section className="area2"></section>
      <section className="main"></section>
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
    background-color: aliceblue;
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    background-color: #586979;
    display: flex;
    align-items: center;
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
