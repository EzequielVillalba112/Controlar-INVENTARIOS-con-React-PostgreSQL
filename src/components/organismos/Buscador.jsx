import styled from "styled-components"
import { IoIosSearch } from "react-icons/io";

export const Buscador = ({setBuscador}) => {
    const buscar = (e)=>{
        setBuscador(e.target.value)
    }   

  return (
    <Container>
        <article className="content">
            <IoIosSearch className="icono"/>
            <input type="text" onChange={buscar} placeholder="Buscar..."/>
        </article>
    </Container>
  )
}

const Container = styled.div`
    background-color: ${({theme})=>theme.bg};
    border-radius: 16px;
    height: 60px;
    display: flex;
    align-items: center;
    color: ${({theme})=>theme.text};
    border: 1px solid #494949;
    .content{
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        position: relative;
        .icono{
            font-size: 25px;
        }
        input{
            font-size: 18px;
            width: 100%;
            outline: none;
            background: none;
            border: 0;
            color: ${({theme})=>theme.text};
        }
    }
`;