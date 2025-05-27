import styled from "styled-components";

export const CardProductoSelect = ({ descripcion, stock}) => {
  return (
    <Container>
      <div className="data-card">
        <div className="text">
          <span>Descripcion:</span>
          <span className="descripcion">{descripcion}</span>
        </div>
        <div className="text">
          <span>Stock actual:</span>
          <span className="Stock">{stock}</span>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  background-color: rgba(59, 121, 18, 0.555);
  border: 2px dashed #07681c;
  border-radius: 16px;
  margin-bottom: 10px;
  .data-card {
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin-left: 10px;
    gap: 10px;
    .text{
        display: flex;
        gap: 10px;
        font-size: 18px;
        .descripcion{
            font-weight: 600;
        }
    }
  }
`;
