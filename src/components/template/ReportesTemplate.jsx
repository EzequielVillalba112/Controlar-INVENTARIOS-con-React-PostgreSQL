import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

export function ReportesTemplate() {
  return (
    <Container>
      <PageContainer>
        <Content>
          <Outlet />
        </Content>

        <Sidebar>
          <SidebarSection>
            <SidebarTitle>Stock Actual</SidebarTitle>
            <SidebarItem to="stock-actual-por-producto">
              Por producto
            </SidebarItem>
            <SidebarItem to="stock-actual-todo">Todos</SidebarItem>
            <SidebarItem to="stock-bajo-minimo">Bajo del mínimo</SidebarItem>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Entradas y Salidas</SidebarTitle>
            <SidebarItem to="kardex-entradas-salidas">Por producto</SidebarItem>
          </SidebarSection>

           <SidebarSection>
            <SidebarTitle>Valorizado</SidebarTitle>
            <SidebarItem to="inventario-valorado">Todos</SidebarItem>
          </SidebarSection>
        </Sidebar>
      </PageContainer>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 15px;
  color: ${({ theme }) => theme.text};
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  justify-content: center;
  width: 100%;
  @media (min-width: 760px) {
    flex-direction: row;
  }

  .container-sidebar {
    display: flex;
    flex-direction: column;
  }
`;

const Content = styled.div`
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
  flex: 1;
`;

const Sidebar = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (min-width: 760px) {
    width: 250px;
    order: 2;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: 20px;
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.color2};
  padding: 12px;
`;

const SidebarTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.2em;
`;

const SidebarItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  margin: 5px 0;
  padding: 0 5%;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  height: 60px;
  transition: 0.5s ease-in;
  &:hover {
    background-color: #bd7203;
    color: #fff;
  }
  &.active {
    background-color: #a56301;
    color: #fff;
  }
`;
