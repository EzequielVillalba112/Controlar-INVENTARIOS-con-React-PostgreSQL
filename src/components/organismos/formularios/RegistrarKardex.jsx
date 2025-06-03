import { useEffect, useState } from "react";
import styled from "styled-components";
import { V } from "../../../styles/Variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../moleculas/BtnSave";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { capitalizeFirst } from "../../../utils/Conversiones";
import { Buscador } from "../Buscador";
import { ListaGenerica } from "../ListaGenerica";
import { useProductoStore } from "../../../store/ProductoStore";
import { CardProductoSelect } from "../../moleculas/CardProductoSelect";
import { useKardexStore } from "../../../store/KardexStore";
import { useUserStore } from "../../../store/UserStore";
export function RegistrarKardex({ onClose, dataSelect, accion, tipo }) {
  const [stateListaProd, setStateListaProd] = useState(false);

  const { dataProducto,setBuscador, selectProducto, productoItemSelect } =
    useProductoStore();
  const { idUsuario } = useUserStore();
  const { insertarKardex } = useKardexStore();
  const { dataEmpresa } = useEmpresaStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function insertar(data) {
    const p = {
      fecha: new Date(),
      tipo: tipo,
      id_usuario: idUsuario,
      cantidad: parseFloat(data.cantidad),
      detalle: capitalizeFirst(data.detalle),
      id_empresa: dataEmpresa.id,
      id_producto: productoItemSelect.id,
    };
    await insertarKardex(p);
    onClose();
  }
  useEffect(() => {
    if (accion === "Editar") {
    }
  }, []);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>Nueva {tipo}</h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <div className="container-buscador">
          <div onClick={() => setStateListaProd(!stateListaProd)}>
            <Buscador setBuscador={setBuscador} />
          </div>
          {stateListaProd && (
            <ListaGenerica
              data={dataProducto}
              setState={() => setStateListaProd(!stateListaProd)}
              scroll="scroll"
              funcion={selectProducto}
            />
          )}
        </div>

        <CardProductoSelect
          descripcion={productoItemSelect.descripcion}
          stock={productoItemSelect.stock}
        />

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            <article>
              <InputText icono={<V.iconotodos />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("detalle", {
                    required: true,
                  })}
                />
                <label className="form__label">Desripcion</label>
                {errors.detalle?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <article>
              <InputText icono={<V.iconocalculadora />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.cantidad}
                  type="number"
                  placeholder=""
                  {...register("cantidad", {
                    required: true,
                  })}
                />
                <label className="form__label">Cantidad</label>
                {errors.cantidad?.type === "required" && <p>Campo requerido</p>}
              </InputText>
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
