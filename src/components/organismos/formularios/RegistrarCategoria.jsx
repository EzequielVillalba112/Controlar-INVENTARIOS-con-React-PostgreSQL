import { useEffect, useState } from "react";
import styled from "styled-components";
import { V } from "../../../styles/Variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../moleculas/BtnSave";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { capitalizeFirst } from "../../../utils/Conversiones";
import { useCategoriaStore } from "../../../store/CategoriaStore";
import { CirclePicker } from "react-color";

export function RegistrarCategoria({ onClose, dataSelect, accion }) {
  const [color, setColor] = useState("#f3a807");
  const { insertarCategoria, editarCategoria } = useCategoriaStore();
  const { dataEmpresa } = useEmpresaStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const elegirColor = (color) => {
    setColor(color.hex);
  };

  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        descripcion: capitalizeFirst(data.nombre),
        color: color,
      };
      await editarCategoria(p);
      onClose();
    } else {
      const p = {
        _descripcion: capitalizeFirst(data.nombre),
        _idempresa: dataEmpresa.id,
        _color: color,
      };
      await insertarCategoria(p);
      onClose();
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
      setColor(dataSelect.color);
    }
  }, []);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar"
                ? "Editar categoria"
                : "Registrar nueva categoria"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            <article>
              <InputText icono={<V.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("nombre", {
                    required: true,
                  })}
                />
                <label className="form__label">Categoria</label>
                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <article className="color-container">
              <CirclePicker onChange={elegirColor} color={color} />
            </article>

            <div className="btnguardarContent">
              <Btnsave
                icono={<V.iconoguardar />}
                titulo="Guardar"
                bgcolor="#ef552b"
                textColor="#ffff"
              />
            </div>
          </section>
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
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgfondo};
    box-shadow: -10px 15px 30px rgb(10, 9, 9);
    padding: 13px 36px 20px 36px;
    z-index: 100;

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
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const ContainerEmojiPicker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
