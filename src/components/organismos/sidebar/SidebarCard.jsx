import styled from "styled-components";
import { V } from "../../../styles/variables";
import { Btnsave } from "../../moleculas/BtnSave";
import { useAuthStore } from "../../../store/AuthStore";
import { useNavigate } from "react-router-dom";
export function SidebarCard() {
  const navigate = useNavigate();
  const { signOut } = useAuthStore();
  const cerrarSesion = () => {
    sessionStorage.removeItem("ya_recargado");

    setTimeout(async () => {
      await signOut();
      navigate("/login"); // Redirige al login
    }, 100);
  };

  return (
    <Container>
      <div className="card-container">
        <span className="icon">{<V.iconouser />}</span>
        <h3>Cerrar sesión</h3>
        <div className="btn-container">
          <Btnsave
            titulo="Cerrar ..."
            bgcolor="#f8f2fd"
            funcion={cerrarSesion}
          />
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .icon {
    font-size: 3rem;
    border-radius: 50%;
    right: 50%;
    z-index: 100;
  }
  .card-container {
    position: relative;
    padding: 1rem;
    background: ${(props) => props.theme.bg5};
    border-radius: 10px;
    overflow: hidden;

    h3 {
      font-size: 1.1rem;
      padding: 1rem 0;
      font-weight: 800;
      color: #131313;
    }
    .btn-container {
      position: relative;
      margin-left: -8px;
    }
  }
`;
