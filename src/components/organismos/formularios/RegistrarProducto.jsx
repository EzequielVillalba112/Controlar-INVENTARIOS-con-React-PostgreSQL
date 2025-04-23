import { useEffect, useState } from "react";
import styled from "styled-components";
import { V } from "../../../styles/Variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../moleculas/BtnSave";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { capitalizeFirst } from "../../../utils/Conversiones";
import { useProductoStore } from "../../../store/ProductoStore";
import { useCategoriaStore } from "../../../store/CategoriaStore";
import { ContainerSelector } from "../../atomos/ContainerSelector";
import { Selector } from "../Selector";
import { useMarcaStore } from "../../../store/MarcaStore";
import { BtnFiltro } from "../../moleculas/BtnFiltro";
import { RegistrarMarca } from "./RegistrarMarca";
export function RegistrarProducto({ onClose, dataSelect, accion }) {
  const { insertarProducto, editarProducto } = useProductoStore();
  const { categoriaItemSelect, datacategorias, selectcategorias } =
    useCategoriaStore();
  const { marcaItemSelect, dataMarca } = useMarcaStore();
  const [marca, setMarca] = useState(false);
  const [openRegistroMarca, setOpenRegisroMarca] = useState();
  const { dataEmpresa } = useEmpresaStore();
  const [subAccion, setSubAccion] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const nuevoRegistroMarca = () => {
    setOpenRegisroMarca(!openRegistroMarca);
    setSubAccion("Nuevo");
  };

  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        descripcion: capitalizeFirst(data.descripcion),
        idmarca: marcaItemSelect.id,
        stock: parseFloat(data.stock),
        stock_minimo: parseFloat(data.codigointerno),
        codigobarras: parseFloat(data.codigobarras),
        codigointerno: data.codigointerno,
        precioventa: parseFloat(data.precioventa),
        preciocompra: parseFloat(data.preciocompra),
        id_categoria: categoriaItemSelect.id,
        id_empresa: dataEmpresa.id,
      };
      await editarProducto(p);
      onClose();
    } else {
      const p = {
        _descripcion: capitalizeFirst(data.descripcion),
        _idmarca: marcaItemSelect.id,
        _stock: parseFloat(data.stock),
        _stock_minimo: parseFloat(data.codigointerno),
        _codigobarras: parseFloat(data.codigobarras),
        _codigointerno: data.codigointerno,
        _precioventa: parseFloat(data.precioventa),
        _preciocompra: parseFloat(data.preciocompra),
        _id_categoria: categoriaItemSelect.id,
        _id_empresa: dataEmpresa.id,
      };
      await insertarProducto(p);
      onClose();
    }
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
            <h1>
              {accion == "Editar"
                ? "Editar producto"
                : "Registrar nuevo producto"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            <article>
              <InputText icono={<V.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("nombre", {
                    required: true,
                  })}
                />
                <label className="form__label">Descripción</label>
                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <ContainerSelector>
              <label>Marca:</label>
              <Selector
                funcion={() => setMarca(!marca)}
                state={marca}
                color="#fc6027"
                text1="📌"
                text2={marcaItemSelect?.descripcion}
              />
              <BtnFiltro
                funcion={nuevoRegistroMarca}
                bgColor="#ffffff"
                textColor="#ffffff"
                icono={<V.agregar />}
              />
            </ContainerSelector>

            <div className="btnguardarContent">
              <Btnsave
                funcion={nuevoRegistroMarca}
                icono={<V.iconoguardar />}
                titulo="Guardar"
                bgcolor="#ef552b"
                textColor="#ffff"
              />
            </div>
          </section>
        </form>
        {openRegistroMarca && (
          <RegistrarMarca
            accion={subAccion}
            onClose={() => setOpenRegisroMarca(!openRegistroMarca)}
            dataSelect={dataSelect}
          />
        )}
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
