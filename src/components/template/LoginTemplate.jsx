import styled from "styled-components";
import { useAuthStore } from "../../store/AuthStore";
import { V } from "../../styles/variables";
import { Btnsave } from "../moleculas/BtnSave";
import { Device } from "../../styles/Breackpoints";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import carrito from "../../assets/inventario.png";
import logo from "../../assets/inventarioslogo.png";
import { MdOutlineInfo } from "react-icons/md";
import { InputText } from "../organismos/formularios/InputText";
import { RegistrarAdmin } from "../organismos/formularios/RegistrarAdmin";
export function LoginTemplate() {
  const { signInWithEmail } = useAuthStore();
  const [state, setState] = useState(false);
  const [stateInicio, setStateInicio] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function iniciar(data) {
    const response = await signInWithEmail({
      correo: data.correo,
      pass: data.pass,
    });
    if (response) {
      navigate("/");
    } else {
      setStateInicio(true);
    }
  }

  return (
    <Container>
      <div className="contentLogo">
        <img src={logo}></img>
        <span>Inveon</span>
      </div>
      <div className="bannerlateral">
        <img src={carrito}></img>
      </div>

      <div className="contentCard">
        <div className="card">
          {/* {state && <RegistrarAdmin setState={()=>setState(!state)}/>} */}
          <Titulo>Inveon</Titulo>
         
          <p className="frase">Controla tu inventario.</p>
          <form onSubmit={handleSubmit(iniciar)}>
            <InputText icono={<V.iconoemail />}>
              <input
                className="form__field"
                type="text"
                placeholder="email"
                {...register("correo", {
                  required: true,
                })}
              />
              <label className="form__label">email</label>
              {errors.correo?.type === "required" && <p>Campo requerido</p>}
            </InputText>
            <InputText icono={<V.iconopass />}>
              <input
                className="form__field"
                type="password"
                placeholder="contraseña"
                {...register("pass", {
                  required: true,
                })}
              />
              <label className="form__label">pass</label>
              {errors.pass?.type === "required" && <p>Campo requerido</p>}
            </InputText>
            {stateInicio && (
              <TextoStateInicio>datos incorrectos</TextoStateInicio>
            )}
            <ContainerBtn>
              <Btnsave titulo="Iniciar" bgcolor="#fc6b32" textColor="#ffff" />
              {/* <Btnsave
                funcion={() => setState(!state)}
                titulo="Crear cuenta"
                bgcolor="#ffffff"
                textColor="#242424"
              /> */}
            </ContainerBtn>
          </form>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-size: cover;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #262626;
  @media ${Device.tablet} {
    grid-template-columns: 1fr 2fr;
  }
  .form__field{
    color: #242424 !important;
  }
  .contentLogo {
    position: absolute;
    top: 15px;
    font-weight: 700;
    display: flex;
    left: 15px;
    align-items: center;
    color: #fff;

    img {
      width: 50px;
    }
  }
  .cuadros {
    transition: cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
    transition: 0.6s;
  }

  .bannerlateral {
    background-color: #242424;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
    }
  }
  .contentCard {
    grid-column: 2;
    background-color: #ffffff;
    background-size: cover;
    z-index: 100;
    position: relative;
    gap: 30px;
    display: flex;
    padding: 20px;
    box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);
    justify-content: center;
    width: auto;
    height: 100%;
    width: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .card {
      padding-top: 80px;
      width: 100%;
      @media ${Device.laptop} {
        width: 50%;
      }
    }
    .version {
      color: #727272;
      text-align: start;
    }
    .contentImg {
      width: 100%;
      display: flex;
      justify-content: center;

      img {
        width: 40%;

        animation: flotar 1.5s ease-in-out infinite alternate;
      }
    }
    .frase {
      color: #fc6c32;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 30px;
    }
    .ayuda {
      position: absolute;
      top: 15px;
      right: 15px;
      color: #8d8d8d;
      font-size: 15px;
      font-weight: 500;
    }
    &:hover {
      .contentsvg {
        top: -100px;
        opacity: 1;
      }
      .cuadros {
        transform: rotate(37deg) rotateX(5deg) rotateY(12deg) rotate(3deg)
          skew(2deg) skewY(1deg) scaleX(1.2) scaleY(1.2);
        color: red;
      }
    }
  }
  @keyframes flotar {
    0% {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, -0px);
    }
  }
`;
const Titulo = styled.span`
  font-size: 3rem;
  font-weight: 700;
  color: #424242;
`;
const ContainerBtn = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;
const TextoStateInicio = styled.p`
  width: 100%;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #e43d3d;
`;
