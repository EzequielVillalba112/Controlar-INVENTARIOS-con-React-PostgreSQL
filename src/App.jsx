import styled, { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "./context/AuthContext";
import { MyRoutes } from "./routers/Routes";
import { createContext, useState } from "react";
import { Dark, Light } from "./styles/Themes.jsx";
import { Sidebar } from "./components/organismos/sidebar/SideBar";
import { MenuHambur } from "./components/organismos/MenuHambur";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useLocation } from "react-router-dom";
import { Login } from "./page/Login";
import { Device } from "./styles/Breackpoints.jsx";

export const ThemeContext = createContext(null);
function App() {
  const [themeUse, setThemeUse] = useState("dark");
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const theme = themeUse === "light" ? "light" : "dark";
  const themeStyled = theme === "light" ? Light : Dark;
  const {pathname} = useLocation();

  return (
    <ThemeContext.Provider value={{ themeUse, setThemeUse }}>
      <ThemeProvider theme={themeStyled}>
        <AuthContextProvider>
          {
            pathname != "/login" ? (<Container className={sideBarOpen ? "active" : ""}>
              <section className="side-bar_continer">
                <Sidebar
                  state={sideBarOpen}
                  setState={() => setSideBarOpen(!sideBarOpen)}
                />
              </section>
              <section className="menu-hamburger_container">
                <MenuHambur />
              </section>
              <section className="routes_container">
                <MyRoutes />
              </section>
            </Container>):(<Login/>)
          }
          
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthContextProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
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
