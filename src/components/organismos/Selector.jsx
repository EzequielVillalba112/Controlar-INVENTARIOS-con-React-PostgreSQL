import styled from "styled-components";
import { V } from "../../styles/Variables";

export const Selector = ({ color, state, funcion, text1, text2 }) => {
  return (
    <Container $color={color} onClick={funcion}>
      <div>
        <span>{text1}</span>
        <span>{text2}</span>
      </div>
      <span className={state ? "open" : "close"}>{<V.iconoFlechabajo />}</span>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  cursor: pointer;
  border: 2px solid #4e4e4e;
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  transition: 0.3s;
  font-weight: 600;
  .open {
    transition: 0.3s;
    transform: rotate(180deg);
  }
  .close {
    transition: 0.3s;
    transform: rotate(0deg);
  }
  &:hover {
    background-color: ${(props) => props.$color};
  }
`;
