import styled from "styled-components";
import { V } from "../../styles/Variables";
import { LinksArray, SecondarylinksArray } from "../../utils/dataEstatica";
import { NavLink } from "react-router-dom";
import { ToggleTema } from "./ToggleTema";
import { useState } from "react";

export const MenuHambur = () => {
  const [click, setClick] = useState(false);

  return (
    <Container>
      <NavBar>
        <section>
          <HamburgerMenu onClick={() => setClick(!click)}>
            <label
              className={click ? "togglerLable active" : "togglerLable"}
              htmlFor="toggleChecker"
            >
              <div className="checkboxtoggler">
                <div className="line-1"></div>
                <div className="line-2"></div>
                <div className="line-3"></div>
              </div>
            </label>
          </HamburgerMenu>
        </section>

        <Menu $click={click.toString()}>
          {LinksArray.map(({ icon, label, to }) => (
            <div
              onClick={() => setClick(!click)}
              className="link-container"
              key={label}
            >
              <NavLink to={to} className="links">
                <div className="link-icon">{icon}</div>
                <span>{label}</span>
              </NavLink>
            </div>
          ))}
          <Divider />
          {SecondarylinksArray.map(({ icon, label, to }) => (
            <div
              onClick={() => setClick(!click)}
              className="link-container"
              key={label}
            >
              <NavLink to={to} className="links">
                <div className="link-icon">{icon}</div>
                <span>{label}</span>
              </NavLink>
            </div>
          ))}
          <ToggleTema />
          <Divider />
        </Menu>
      </NavBar>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.body};
  cursor: pointer;
  position: relative;
  z-index: 300;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  height: 100vh;
`;

const HamburgerMenu = styled.span`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 200;
  background-color: #292929;
  padding: 10px;
  border-radius: 16px;

  .checkboxtoggler {
    width: 3em;
    display: flex;
    flex-direction: column;
    gap: 0.7em;
    cursor: pointer;
  }

  .line-1 {
    background: #df6447;
    height: 0.3em;
    border-radius: 10em;
    transition-duration: 500ms;
  }

  .line-2 {
    background: #df6447;
    height: 0.3em;
    border-radius: 10em;
    transition-duration: 500ms;
  }

  .line-3 {
    background: #df6447;
    height: 0.3em;
    border-radius: 10em;
    transition-duration: 500ms;
  }

  #toggleChecker {
    height: 3em;
    width: 100%;
    display: none;
  }

  .togglerLable {
    &.active {
      .checkboxtoggler .line-1 {
        -webkit-transform: rotate(45deg) translateY(0.7em) translateX(0.7em);
        -ms-transform: rotate(45deg) translateY(0.7em) translateX(0.7em);
        transform: rotate(45deg) translateY(0.7em) translateX(0.7em);
      }
      .checkboxtoggler .line-2 {
        -webkit-transform: rotate(-45deg) translateY(0em) translateX(0.1em);
        -ms-transform: rotate(-45deg) translateY(0em) translateX(0.1em);
        transform: rotate(-45deg) translateY(0em) translateX(0.1em);
      }
      .checkboxtoggler .line-3 {
        transform: scaleX(0);
        transform-origin: left;
      }
    }
  }
`;

const Menu = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  background-color: ${({ theme }) => `rgba(${theme.bodyRgba},0.85)`};
  backdrop-filter: blur(3px);
  transform: ${({ $click }) =>
    $click == "true" ? "translateY(0)" : "translateX(1000%)"};
  transition: all 0.3s ease;

  .link-container {
    &:hover {
      background: ${({ theme }) => theme.bgAlpha};
    }
    .links {
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: ${({ theme }) => theme.text};
      height: 80px;

      .link-icon {
        padding: 1rem;
        display: flex;
        svg {
          font-size: 25px;
        }
      }
    }
  }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.bg4};
  margin: ${() => V.lgSpacing} 0;
`;
