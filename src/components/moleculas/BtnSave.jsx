import styled from "styled-components";
import { Icono } from "../atomos/Iconos";
export function Btnsave({ funcion, titulo, bgcolor, icono, url, textColor }) {
  return (
    <Container type="submit" $bgcolor={bgcolor} $textColor={textColor}>
      <Icono>{icono}</Icono>
      <span className="btn" onClick={funcion}>
        <a href={url} target="_blank">
          {titulo}
        </a>
      </span>
    </Container>
  );
}
const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: none;
  gap: 10px;
  background-color: initial;
  z-index: 2;
  .btn {
    background: ${(props) => props.$bgcolor};
    padding: 0.6em 1.3em;
    font-weight: 800;
    font-size: 18px;
    border-radius: 0.4em;
    transition: 0.2s;
    white-space: 1px;
    color: ${(props) => props.$textColor};
    a {
      text-decoration: none;
      letter-spacing: 1.5px;
    }
    cursor: pointer;
    &:hover {
      transform: translate(-0.05em, -0.05em);
    }
    &:active {
      transform: translate(0.05em, 0.05em);
    }
  }
`;
