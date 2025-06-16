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
import { ListaGenerica } from "../ListaGenerica";
import { RegistrarCategoria } from "./RegistrarCategoria";
import { Device } from "../../../styles/Breackpoints";
export function RegistrarProducto({ onClose, dataSelect, accion }) {
  const { insertarProducto, editarProducto } = useProductoStore();
  const { categoriaItemSelect, dataCategoria, selectCategoria } =
    useCategoriaStore();
  const { marcaItemSelect, dataMarca, selectMarca } = useMarcaStore();
  const [marca, setMarca] = useState(false);
  const [categoria, setCategoria] = useState(false);
  const [openRegistroMarca, setOpenRegisroMarca] = useState();
  const [openRegistroCategoria, setOpenRegistroCategoria] = useState();
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

  const nuevoRegistroCategoria = () => {
    setOpenRegistroCategoria(!openRegistroCategoria);
    setSubAccion("Nuevo");
  };

  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        descripcion: capitalizeFirst(data.descripcion),
        idmarca: marcaItemSelect.id,
        stock: parseFloat(data.stock),
        stock_minimo: parseFloat(data.stock_minimo),
        codigobarra: parseFloat(data.codigobarra),
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
        _stock_minimo: parseFloat(data.stock_minimo),
        _codigobarra: parseFloat(data.codigobarra),
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
      selectMarca({ id: dataSelect.idmarca, descripcion: dataSelect.marca });
      selectCategoria({
        id: dataSelect.id_categoria,
        descripcion: dataSelect.categoria,
      });
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
          <section className="section-1">
            <article>
              <InputText icono={<V.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("descripcion", {
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
              {marca && (
                <ListaGenerica
                  setState={() => setMarca(!marca)}
                  bottom="-260px"
                  scroll="scroll"
                  data={dataMarca}
                  funcion={selectMarca}
                />
              )}
              <BtnFiltro
                funcion={nuevoRegistroMarca}
                bgColor="#ffffff"
                textColor="#ffffff"
                icono={<V.agregar />}
              />
            </ContainerSelector>

            {accion === "Editar" ? (
              <article>
                <InputText icono={<V.iconoemail />}>
                  <input
                    disabled
                    className={
                      accion === "Editar"
                        ? "form__field disabled"
                        : "form__field"
                    }
                    defaultValue={dataSelect.stock}
                    type="number"
                    placeholder=""
                  />
                  <label className="form__label">Stock</label>
                </InputText>
              </article>
            ) : (
              <article>
                <InputText icono={<V.iconostock />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.stock}
                    type="number"
                    placeholder=""
                    {...register("stock", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Stock</label>
                  {errors.stock?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
            )}

            {/* <article>
              <InputText icono={<V.iconostock />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.stock}
                  type="number"
                  placeholder=""
                  {...register("stock", {
                    required: true,
                  })}
                />
                <label className="form__label">Stock</label>
                {errors.stock?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article> */}

            <article>
              <InputText icono={<V.iconostockminimo />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.stock_minimo}
                  type="number"
                  placeholder=""
                  {...register("stock_minimo", {
                    required: true,
                  })}
                />
                <label className="form__label">Stock minimo</label>
                {errors.stockMinimo?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>

            <ContainerSelector>
              <label>Categoria:</label>
              <Selector
                funcion={() => setCategoria(!categoria)}
                state={categoria}
                color="#fc6027"
                text1="📌"
                text2={categoriaItemSelect?.descripcion}
              />
              {categoria && (
                <ListaGenerica
                  setState={() => setCategoria(!categoria)}
                  bottom="50px"
                  scroll="scroll"
                  data={dataCategoria}
                  funcion={selectCategoria}
                />
              )}
              <BtnFiltro
                funcion={nuevoRegistroCategoria}
                bgColor="#ffffff"
                textColor="#ffffff"
                icono={<V.agregar />}
              />
            </ContainerSelector>
          </section>

          <section className="section-2">
            <article>
              <InputText icono={<V.iconocodigobarras />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.codigobarra}
                  type="number"
                  placeholder=""
                  {...register("codigobarra", {
                    required: true,
                  })}
                />
                <label className="form__label">Cod. Barra</label>
                {errors.codbarra?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <article>
              <InputText icono={<V.iconocodigointerno />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.codigointerno}
                  type="number"
                  placeholder=""
                  {...register("codigointerno", {
                    required: true,
                  })}
                />
                <label className="form__label">Cod. Interno</label>
                {errors.codinterno?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>

            <article>
              <InputText icono={<V.iconopreciocompra />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.preciocompra}
                  type="number"
                  placeholder=""
                  {...register("preciocompra", {
                    required: true,
                  })}
                />
                <label className="form__label">Precio Compra</label>
                {errors.preciocompra?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>

            <article>
              <InputText icono={<V.iconoprecioventa />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.precioventa}
                  type="number"
                  placeholder=""
                  {...register("precioventa", {
                    required: true,
                  })}
                />
                <label className="form__label">Precio Venta</label>
                {errors.precioventa?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
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
        {openRegistroMarca && (
          <RegistrarMarca
            accion={subAccion}
            onClose={() => setOpenRegisroMarca(!openRegistroMarca)}
            dataSelect={dataSelect}
          />
        )}
        {openRegistroCategoria && (
          <RegistrarCategoria
            accion={subAccion}
            onClose={() => setOpenRegistroCategoria(!openRegistroCategoria)}
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
