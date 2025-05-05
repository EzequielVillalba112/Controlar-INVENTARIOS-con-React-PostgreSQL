import styled from "styled-components";
import { usePersonalStore } from "../../store/PersonalStore";

export const ListaModulos = () => {
  const { datamodulo } = usePersonalStore();
  return <Container></Container>;
};

const Container = styled.div``;
