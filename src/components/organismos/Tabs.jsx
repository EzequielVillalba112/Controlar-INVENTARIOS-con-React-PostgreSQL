import { useState } from "react";
import styled from "styled-components";
import { V } from "../../styles/Variables";
import { Device } from "../../styles/breackpoints";
import { TablaKardex } from "./tablas/TablaKardex";

export const Tabs = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container $activeTab={activeTab}>
      <ul className="tabs">
        <li
          className={activeTab === 0 ? "active" : ""}
          onClick={() => setActiveTab(0)}
        >
          <V.iconopie /> Kardex
        </li>

        <span className="glider"></span>
      </ul>

      <div className="tab-content">
        {activeTab === 0 && <TablaKardex data={data} />}
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid #686767;
  height: 100%;
  border-radius: 16px;
  .tabs {
    position: relative;
    display: flex;
    list-style: none;
    justify-content: space-between;
    flex-direction: column;
    padding: 0;
    margin: 0;

    @media ${Device.tablet} {
      flex-direction: row;
    }

    li {
      gap: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54px;
      width: 180px;
      font-size: 1.25rem;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.3s ease-in;
    }

    .glider {
      position: absolute;
      display: flex;
      flex-direction: column;
      width: 4px;
      height: 54px;
      background-color: #c26e00;
      z-index: 1;
      border-radius: 16px;
      transition: transform 0.25s ease-in-out;
      transform: translateY(${({ $activeTab }) => $activeTab * 100 + "%"});
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      top: 0;
      @media ${Device.tablet} {
        transform: translateX(${({ $activeTab }) => $activeTab * 100 + "%"});
        width: 180px;
        height: 4px;
        top: 100%;
      }
    }

    li:hover {
      color: #ce801b;
    }
  }

  .tab-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
