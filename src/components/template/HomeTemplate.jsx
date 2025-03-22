import styled from "styled-components";
import { Btnsave } from "../moleculas/BtnSave";
import { useUserStore } from "../../store/UserStore";
import { useAuthStore } from "../../store/AuthStore";

export const HomeTemplate = () => {
  const { signOut } = useAuthStore();
  return (
    <Container>
      <div>HomeTemplate</div>
      <Btnsave titulo="Cerrar sesión" bgcolor="#ffff" funcion={signOut}/>
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
  background-color: ${({ theme }) => theme.bgfondo};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;
