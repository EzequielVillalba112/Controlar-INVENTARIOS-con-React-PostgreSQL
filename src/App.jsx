import styled, { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "./context/AuthContext";
import { MyRoutes } from "./routers/Routes";
import { createContext, useState } from "react";
import { Dark, Light } from "./styles/Themes";
import { Device } from "./styles/Breackpoints";
import { Sidebar } from "./components/organismos/sidebar/SideBar";

export const ThemeContext = createContext(null);

function App() {
  const [themeUse, setThemeUse] = useState("dark");
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const theme = themeUse === "light" ? "light" : "dark";
  const themeStyled = theme === "light" ? Light : Dark;

  return (
    <>
      <ThemeContext.Provider value={{ themeUse, setThemeUse }}>
        <ThemeProvider theme={themeStyled}>
          <AuthContextProvider>
            <Container className={sideBarOpen ? "active" : ""}>
              <section className="side-bar_continer">
                <Sidebar state={sideBarOpen} setState={() => setSideBarOpen(!sideBarOpen)} />
              </section>
              <section className="menu-hamburger_container">ham</section>
              <section className="routes_container">
                <MyRoutes />
              </section>
            </Container>
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.bgfondo};

  .side-bar_continer {
    display: none;
  }

  .menu-hamburger_container {
    display: block;
    position: absolute;
    left: 20px;
    z-index: 100;
  }

  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .side-bar_continer {
      display: initial;
    }

    .menu-hamburger_container {
      display: none;
    }
  }
  .routes_container {
    grid-column: 1;
    width: 100%;
    @media ${Device.tablet} {
      grid-column: 2;
    }
  }
`;
export default App;
