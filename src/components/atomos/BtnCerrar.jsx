import styled from "styled-components"
import { V } from "../../styles/Variables"

export const BtnCerrar = ({funcion}) => {
  return (
    <Container onClick={funcion}>
        <V.iconocerrar/>
    </Container>
  )
}

const Container = styled.div`
    cursor: pointer;
    font-size: 25px;
    transition: all 0.2s;
    &:hover{
        color: #ec5109;
    }
`