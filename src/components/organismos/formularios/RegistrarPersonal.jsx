import { useEffect, useState } from "react";
import styled from "styled-components";
import { V } from "../../../styles/Variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../moleculas/BtnSave";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { ContainerSelector } from "../../atomos/ContainerSelector";
import { Selector } from "../Selector";
import { ListaGenerica } from "../ListaGenerica";
import { Device } from "../../../styles/Breackpoints";
import { TipouserData } from "../../../utils/dataEstatica";
import { ListaModulos } from "../ListaModulos";
import { usePersonalStore } from "../../../store/PersonalStore";
import { useQuery } from "@tanstack/react-query";

export function RegistrarPersonal({ onClose, dataSelect, accion }) {
  const { insertarpersonal, editarpersonal, mostrarpermisospersonal } =
    usePersonalStore();
  const { isLoading } = useQuery({
    queryKey: [
      "mostrar permisos personal unico",
      { id_usuario: dataSelect.id },
    ],
    queryFn: () => mostrarpermisospersonal({ id_usuario: dataSelect.id }),
    enabled: accion == "Editar",
  });

  const { dataEmpresa } = useEmpresaStore();
  const [checkBoxs, setCheckBoxs] = useState();
  const [tipoUser, setTipoUser] = useState({
    icono: "",
    descripcion: "empleado",
  });
  const [stateTipoUser, setStateTipoUser] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        nombre: data.nombre,
        correo: data.correo,
        dni: data.nrdoc,
        telefono: data.nrtelefono,
        direccion: data.direccion,
        tipo_user: tipoUser.descripcion,
      };
      await editarpersonal(p, checkBoxs, dataEmpresa.id);
      onClose();
    } else {
      const p = {
        nombre: data.nombre,
        dni: data.nrdoc,
        telefono: data.nrtelefono,
        direccion: data.direccion,
        tipo_user: tipoUser.descripcion,
        id_empresa: dataEmpresa.id,
        correo: data.correo,
      };
      const paramsAuth = {
        email: data.correo,
        pass: data.pass,
      };
      await insertarpersonal(paramsAuth, p, checkBoxs);
      onClose();
    }
  }

  useEffect(() => {
    if (accion === "Editar") {
      setTipoUser({ icono: "", descripcion: dataSelect.tipo_user });
    }
  }, []);

  if (isLoading) return <span>Cargando...</span>;
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar"
                ? "Editar personal"
                : "Registrar nuevo personal"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section className="section-1">
            {accion != "Editar" ? (
              <article>
                <InputText icono={<V.iconoemail />}>
                  <input
                    className={
                      accion === "Editar"
                        ? "form__field disabled"
                        : "form__field"
                    }
                    defaultValue={dataSelect.correo}
                    type="email"
                    placeholder=""
                    {...register("correo", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Correo</label>
                  {errors.correo?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
            ) : (
              <article>
                <InputText icono={<V.iconoemail />}>
                  <input
                    disabled
                    className="form__field disabled"
                    defaultValue={dataSelect.correo}
                  />
                  <label className="form__label">Correo</label>
                </InputText>
              </article>
            )}

            {accion != "Editar" && (
              <article>
                <InputText icono={<V.iconopass />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.pass}
                    type="password"
                    placeholder=""
                    {...register("pass", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                  <label className="form__label">Contraseña</label>
                  {errors.pass?.type === "required" && <p>Campo requerido</p>}
                  {errors.pass?.type === "minLength" && (
                    <p>Debe tener al menos 6 caracteres</p>
                  )}
                </InputText>
              </article>
            )}

            <article>
              <InputText icono={<V.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.nombre}
                  type="text"
                  placeholder=""
                  {...register("nombre", {
                    required: true,
                  })}
                />
                <label className="form__label">Nombre usuario</label>
                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <article>
              <InputText icono={<V.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.dni}
                  type="text"
                  placeholder=""
                  {...register("nrdoc", {
                    required: true,
                  })}
                />
                <label className="form__label">Numero de documento</label>
                {errors.nrdoc?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<V.iconoreportes />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.telefono}
                  type="number"
                  placeholder=""
                  {...register("nrtelefono", {
                    required: true,
                  })}
                />
                <label className="form__label">Numero de telefono</label>
                {errors.nrtelefono?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
            <article>
              <InputText icono={<V.iconoreportes />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.direccion}
                  type="text"
                  placeholder=""
                  {...register("direccion", {
                    required: true,
                  })}
                />
                <label className="form__label">Dirección</label>
                {errors.direccion?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
          </section>

          <section className="section-2">
            <ContainerSelector>
              <label>Tipo user:</label>
              <Selector
                color="#fc6027"
                text1="📌"
                text2={tipoUser.descripcion}
                funcion={() => setStateTipoUser(!stateTipoUser)}
              />
              {stateTipoUser && (
                <ListaGenerica
                  data={TipouserData}
                  funcion={(p) => setTipoUser(p)}
                  bottom="-150px"
                  scroll="scroll"
                  setState={() => setStateTipoUser(!stateTipoUser)}
                />
              )}
            </ContainerSelector>
            Permisos:
            <ListaModulos
              accion={accion}
              checkBoxs={checkBoxs}
              setCheckBoxs={setCheckBoxs}
            />
          </section>

          <div className="btn-guardar_content">
            <Btnsave
              icono={<V.iconoguardar />}
              titulo="Guardar"
              bgcolor="#ef552b"
              textColor="#ffff"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.842);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  .sub-contenedor {
    width: 100%;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgfondo};
    box-shadow: -10px 15px 30px rgb(10, 9, 9);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      border-radius: 16px;
      width: 12px;
      background-color: rgb(255, 205, 158);
      filter: blur(10px);
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(175, 105, 0, 0.5);
      border-radius: 16px;
    }
    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      @media ${Device.tablet} {
        grid-template-columns: repeat(2, 1fr);
      }
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
      .btn-guardar_content {
        display: flex;
        justify-content: end;
        grid-column: 1;
        @media ${Device.tablet} {
          grid-column: 2;
        }
      }
    }
  }
`;

// const ContentTitle = styled.div`
//   display: flex;
//   justify-content: start;
//   align-items: center;
//   gap: 20px;
//   svg {
//     font-size: 25px;
//   }
//   input {
//     border: none;
//     outline: none;
//     background: transparent;
//     padding: 2px;
//     width: 40px;
//     font-size: 28px;
//   }
// `;
// const ContainerEmojiPicker = styled.div`
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
// `;
