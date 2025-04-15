import styled from "styled-components";

export const BtnFiltro = ({ bgColor, textColor, icono, funcion }) => {
  return (
    <Container $textColor={textColor} $bgColor={bgColor} onClick={funcion}>
      <div className="content-icon">
        <span>{icono}</span>
      </div>
    </Container>
  );
};

const Container = styled.div`
    min-width: 50px;
    min-height: 50px;
    border-radius: 50%;
    background: #0173be;
    color: ${(props)=>props.$textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    position: relative;
    cursor: pointer;
    .content-icon{  
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s;
        &:hover{
            transform: scale(1.3);
        }
    }
`;
