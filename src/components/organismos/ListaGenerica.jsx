import styled from "styled-components";
import { BtnCerrar } from "../atomos/BtnCerrar";
import { Device } from "../../styles/Breackpoints";

export const ListaGenerica = ({ data, setState, funcion, scroll, bottom }) => {
  const seleccionar = (p) => {
    funcion(p);

    setState();
  };
  return (
    <Container $scroll={scroll} $bottom={bottom}>
      <section className="content-close">
        <BtnCerrar funcion={setState} />
      </section>
      <section className="content-items">
        {data?.map((item, i) => {
          return (
            <ItemContainer key={i} onClick={() => seleccionar(item)}>
              <span>{item.descripcion}</span>
            </ItemContainer>
          );
        })}
      </section>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  position: absolute;
  margin-bottom: 15px;
  bottom: ${(props) => props.$bottom};
  width: 400px;
  padding: 10px;
  border-radius: 16px;
  gap: 10px;
  z-index: 100;
  height: auto;
  max-height: 230px;
  @media ${Device.tablet} {
    width: 400px;
  }

  .content-items {
    overflow-y: ${(props) => props.$scroll};
    &::-webkit-scrollbar {
      width: 12px;
      background-color: rgba(241, 121, 7, 0.2);
      filter: blur(10px);
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(175, 105, 0, 0.5);
      border-radius: 10px;
    }
  }
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 10px;
  border-radius: 16px;
  cursor: pointer;
  transition: 0.3s;
  padding: 10px;
  width: 100%;
  span {
    width: 100%;
    height: 100%;
  }
  &:hover {
    background-color: #33333386;
  }
`;
