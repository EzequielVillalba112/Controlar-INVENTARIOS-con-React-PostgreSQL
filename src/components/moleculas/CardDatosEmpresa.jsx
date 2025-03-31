import styled from "styled-components";

export const CardDatosEmpresa = ({ title, value, img }) => {
  return (
    <Container>
      <div className="card">
        <div className="pricing-block-content">
          <p className="pricing-plan">{title}</p>
          <div className="price-value">
            <p className="price-number">{value}</p>
            {img && <img src={img} />}
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .card {
    width: 190px;
    background: #fff;
    padding: 1rem;
    border-radius: 1rem;
    border: 2px solid #030303f6;
    overflow: hidden;
    color: #333333;
    z-index: 100;
    .pricing-block-content {
      display: flex;
      height: 100%;
      flex-direction: column;
      gap: 0.5rem;
      .pricing-plan {
        color: #080808;
        font-size: 1.3rem;
        font-weight: 700;
        text-align: center;
      }
      .price-value {
        color: #1b1b1b;
        font-size: 1.3rem;
        font-weight: 600;
        text-align: center;
        img{
            width: 50px;
        }
      }
    }
  }
`;
