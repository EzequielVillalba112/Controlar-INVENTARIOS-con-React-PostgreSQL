import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";
import { ContentAccionesTabla } from "../ContentAccionesTabla";
import Swal from "sweetalert2";
import { useMarcaStore } from "../../../store/MarcaStore";
import { V } from "../../../styles/Variables";
import { FaArrowsAltV } from "react-icons/fa";
import { Paginacion } from "./Paginacion";
import { useEffect, useState } from "react";
import { ColorContentTable } from "../../atomos/ColorContentTable";
import { useKardexStore } from "../../../store/KardexStore";
import { useUserStore } from "../../../store/UserStore";
import { Btnsave } from "../../moleculas/BtnSave";

export const TablaKardex = ({ data }) => {
  const { anularKardex } = useKardexStore();
  const { idUsuario } = useUserStore();
  const [pagina, setPagina] = useState(1);

  const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= breakpoint);
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isMobile;
  };

  const mobile = useIsMobile();
  const anular = (p) => {
    anularKardex({ _id_kardex: p.id, _id_usuario: idUsuario });
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Id",
      cell: (info) => (
        <div data-title="Descripcion" className="ContentCell">
          {mobile === true ? <span>Id</span> : null}
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "descripcion",
      header: "Producto",
      cell: (info) => (
        <div data-title="Descripcion" className="ContentCell">
          {mobile === true ? <span>Producto</span> : null}
          <span
            style={{
              textDecoration:
                info.row.original.tipo === "Anulado" && "line-through",
            }}
          >
            {info.getValue()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      cell: (info) => (
        <div className="ContentCell">
          {mobile === true ? <span>Fecha</span> : null}
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      cell: (info) => (
        <div className="ContentCell">
          {mobile === true ? <span>Tipo</span> : null}
          {info.getValue() === "Salida" ? (
            <ColorContentTable $color="#ee3d3d">
              {info.getValue()}
            </ColorContentTable>
          ) : info.getValue() === "Anulado" ? (
            <ColorContentTable $color="#f0aa14">
              {info.getValue()}
            </ColorContentTable>
          ) : (
            <ColorContentTable $color="#419c1d">
              {info.getValue()}
            </ColorContentTable>
          )}
        </div>
      ),
    },
    {
      accessorKey: "detalle",
      header: "Detalle",
      enableSorting: false,
      cell: (info) => (
        <div className="ContentCell">
          {mobile === true ? <span>Detalle</span> : null}
          <span>{info.getValue()}</span>
        </div>
      ),
    },

    {
      accessorKey: "cantidad",
      header: "Cantidad",
      cell: (info) => (
        <div className="ContentCell">
          {mobile === true ? <span>Cantidad</span> : null}
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "stock",
      header: "Stock Act.",
      cell: (info) => (
        <div className="ContentCell">
          {mobile === true ? <span>Stock Act.</span> : null}
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "acciones",
      header: "Accion",
      enableSorting: false,
      cell: (info) => (
        <div className="ContentCell">
          {mobile === true ? <span>Accion</span> : null}
          <div>
            {info.row.original.tipo === "Anulado" ? (
              "Anulado"
            ) : (
              <Btnsave
                bgcolor="#be3232"
                titulo="Anular"
                funcion={() => anular(info.row.original)}
                textColor="#fff"
              />
            )}
          </div>
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Container>
      <table className="responsive-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <span
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <FaArrowsAltV />
                    </span>
                  )}
                  {
                    {
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted()]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((item) => (
            <tr key={item.id}>
              {item.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Paginacion
        table={table}
        irinicio={() => table.setPageIndex(0)}
        pagina={table.getState().pagination.pageIndex + 1}
        setPagina={setPagina}
        maximo={table.getPageCount()}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 5% 3%;
  .disabled {
    background: #4e4d4d !important;
  }
  @media (min-width: ${V.bpbart}) {
    margin: 2%;
  }
  @media (min-width: ${V.bphomer}) {
    margin: 2em auto;
  }
  .responsive-table {
    width: 100%;
    margin-bottom: 1.5em;
    border-spacing: 0;
    @media (min-width: ${V.bpbart}) {
      font-size: 0.9em;
    }
    @media (min-width: ${V.bpmarge}) {
      font-size: 1em;
    }
    thead {
      position: absolute;

      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
      @media (min-width: ${V.bpbart}) {
        position: relative;
        height: auto;
        width: auto;
        overflow: auto;
      }
      th {
        border-bottom: 2px solid rgba(206, 206, 206, 0.32);
        font-weight: normal;
        text-align: center;
        color: ${({ theme }) => theme.text};
        &:first-of-type {
          text-align: center;
        }
      }
    }
    tbody,
    tr,
    th,
    td {
      display: block;
      padding: 0;
      text-align: left;
      white-space: normal;
    }
    tr {
      @media (min-width: ${V.bpbart}) {
        display: table-row;
      }
    }

    th,
    td {
      padding: 0.5em;
      vertical-align: middle;
      @media (min-width: ${V.bplisa}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${V.bpbart}) {
        display: table-cell;
        padding: 0.5em;
      }
      @media (min-width: ${V.bpmarge}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${V.bphomer}) {
        padding: 0.75em;
      }
    }
    tbody {
      @media (min-width: ${V.bpbart}) {
        display: table-row-group;
      }
      tr {
        margin-bottom: 1em;
        background-color: ${({ theme }) => theme.bgcards};
        border-radius: 16px;
        padding: 5px;
        @media (min-width: ${V.bpbart}) {
          display: table-row;
          border-width: 1px;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
        &:nth-of-type(even) {
          @media (min-width: ${V.bpbart}) {
            background-color: rgba(68, 68, 68, 0.12);
          }
        }
      }
      th[scope="row"] {
        @media (min-width: ${V.bplisa}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }
        @media (min-width: ${V.bpbart}) {
          background-color: transparent;
          text-align: center;
          color: ${({ theme }) => theme.text};
        }
      }
      .ContentCell {
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;

        border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        @media (min-width: ${V.bpbart}) {
          justify-content: center;
          border-bottom: none;
        }
      }
      td {
        text-align: right;
        @media (min-width: ${V.bpbart}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
          text-align: center;
        }
      }
      td[data-title]:before {
        content: attr(data-title);
        float: left;
        font-size: 0.8em;
        @media (min-width: ${V.bplisa}) {
          font-size: 0.9em;
        }
        @media (min-width: ${V.bpbart}) {
          content: none;
        }
      }
    }
  }
`;
