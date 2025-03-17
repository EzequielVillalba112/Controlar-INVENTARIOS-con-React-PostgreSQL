import styled from "styled-components";

export const HomeTemplate = () => {
  return (
    <Container>
      <div>HomeTemplate</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: ${({theme})=>theme.bgfondo};
  color: ${({theme})=>theme.text};
  width: 100%;
`;
