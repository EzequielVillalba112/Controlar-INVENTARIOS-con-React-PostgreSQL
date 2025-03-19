import styled from "styled-components";
import { LinksArray, SecondarylinksArray} from "../../../utils/dataEstatica";
import { SidebarCard } from "./SidebarCard";
import { ToggleTema } from "../ToggleTema";
import { V } from "../../../styles/variables";
import { NavLink } from "react-router-dom";

export function Sidebar({ state, setState }) {

  return (
    //$ se usa para pasar un parametro a styled-components
    <Main $isopen={state.toString()}>
      <span className="btn-side-bar" onClick={() => setState(!state)}>
        {<V.iconoflechaderecha />}
      </span>
      <Container $isopen={state.toString()} className={state ? "active" : ""}>
        <div className="logo-container">
          <div className="img-container">
            <img src={V.logo} />
          </div>
          <h2>Inveon</h2>
        </div>
        {LinksArray.map(({ icon, label, to }) => (
          <div
            className={state ? "link-container active" : "link-container"}
            key={label}
          >
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? ` active` : ``}`}
            >
              <div className="link-icon">{icon}</div>
              <span className={state ? "label_ver" : "label_oculto"}>
                {label}
              </span>
              
            </NavLink>
          </div>
        ))}
        <Divider />
        {SecondarylinksArray.map(({ icon, label, to }) => (
          <div
            className={state ? "link-container active" : "link-container"}
            key={label}
          >
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? ` active` : ``}`}
            >
              <div className="link-icon">{icon}</div>
              <span className={state ? "label_ver" : "label_oculto"}>
                {label}
              </span>
             
            </NavLink>
          </div>
        ))}
        <ToggleTema/>
        <Divider />
        {state && <SidebarCard />}
      </Container>
    </Main>
  );
}
const Container = styled.div`
  color: ${({theme}) => theme.text};
  background: ${({theme}) => theme.bg};
  position: fixed;
  padding-top: 20px;
  z-index: 1;
  height: 100%;
  width: 65px;
  transition: 0.1s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({theme})=>theme.colorScroll};
    border-radius: 10px;
  }

  &.active {
    width: 220px;
  }
  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 60px;
    .img-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      transition: 0.3s ease;
      transform: ${({ $isopen }) => ($isopen==="true" ? `scale(1)` : `scale(1.5)`)}
        rotate(${({ theme }) => theme.logorotate});
      img {
        width: 100%;
      }
    }
    h2 {
      font-size:2rem;
      display: ${({ $isopen }) => ($isopen==="true" ? `block` : `none`)};
    }
  }
  .link-container {
    margin: 5px 0;
    transition: all 0.3s ease-in-out;
    padding: 0 5%;
    position: relative;
    &:hover {
      background: ${({theme}) => theme.bgAlpha};
    }
    .links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${() => V.smSpacing} - 2px) 0;
      color: ${({theme}) => theme.text};
      height: 60px;
      .link-icon {
        padding: ${() => V.smSpacing} ${() => V.mdSpacing};
        display: flex;
        svg {
          font-size: 25px;
        }
      }
      .label_ver {
        transition: 0.3s ease-in-out;
        opacity: 1;
      }
      .label_oculto {
        opacity: 0;
      }
      &.active {
        background-color:${({theme}) => theme.bgAlpha};
        color: ${({theme}) => theme.bg5};
        font-weight:600;
        &::before {
          content: "";
          position: absolute;
          height: 100%;
          background: ${({theme}) => theme.bg5};
          width: 5px;
          border-radius: 10px;
          left: 0;
        }
      }
    }
    &.active {
      padding: 0;
    }
  }
`;
const Main = styled.div`
  .btn-side-bar {
    position: fixed;
    top: 70px;
    left: 42px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({theme}) => theme.bgtgderecha};
    box-shadow: 0 0 4px ${({theme}) => theme.bg3},
      0 0 7px ${({theme}) => theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 2;
    transform: ${({ $isopen }) =>
      $isopen==="true" ? `translateX(162px) rotate(3.142rad)` : `initial`};
    color: ${({theme}) => theme.text};
  }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({theme}) => theme.bg4};
  margin: ${() => V.lgSpacing} 0;
`;