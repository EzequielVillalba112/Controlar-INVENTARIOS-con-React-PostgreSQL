import styled from "styled-components";
import Block from "../../assets/block-page.png";

export const BloqueoPagina = () => {
  return (
    <Container>
      <img src={Block} alt="" />
      <h1>Pagina bloqueada</h1>
      <p>
        No puede acceder a esta pagina <br /> sin los permisos adecuados
      </p>
    </Container>
  );
};

const Container = styled.div`
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  h1{
    font-size: 50px;
  }
  P{
    font-size: 20px;
  }
  img {
    width: 200px;
  }
`;
