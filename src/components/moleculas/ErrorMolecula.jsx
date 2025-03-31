import styled from "styled-components"

export const ErrorMolecula = ({message}) => {
  return (
    <Container>
        <span>Error..{message}</span>
    </Container>
  )
}

const Container = styled.div`
    color: ${({theme})=> theme.text};
`