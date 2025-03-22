import styled from "styled-components";
import { Btnsave } from "../moleculas/BtnSave";
import { useUserStore } from "../../store/UserStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const LoginTemplate = () => {
  const navigate = useNavigate();
  const { signUpNewUserAdmin } = useUserStore();
  const mutationInserUser = useMutation({
    mutationKey: ["insertar usuario"],
    mutationFn: async () => {
      const p = {
        email: "usuario@example.com",
        password: "contraseña123",
      };
      const dataUserAuth = await signUpNewUserAdmin(p);
      if (dataUserAuth) {
        navigate("/");
      }
    },
  });
  return (
    <Container>
      <Btnsave
        titulo="Crear cuenta"
        bgcolor="#ffff"
        funcion={mutationInserUser.mutateAsync}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
`;
