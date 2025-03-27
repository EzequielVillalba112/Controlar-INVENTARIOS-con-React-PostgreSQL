import styled from "styled-components";
import { V } from "../../styles/Variables";

export const BannerEmpresa = () => {
  return (
    <div className="container-wrapper-context">
      <span className="titulo">
        {<V.iconoempresa />}
        nombre de empresa
      </span>
      <div className="content-text">
        Inveon 
      </div>
      <ContentCard>
        
      </ContentCard>
    </div>
  );
};

const ContentCard = styled.div`
    
`