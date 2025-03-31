import { BounceLoader } from "react-spinners"
import styled from "styled-components"

export const SpinnerLoader = () => {
  return (
    <Container>
        <BounceLoader color="#f76f3a" size={200}/>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1100;
    background-color: ${({ theme }) => theme.bgfondo};
    transform: all 0.3s;
`