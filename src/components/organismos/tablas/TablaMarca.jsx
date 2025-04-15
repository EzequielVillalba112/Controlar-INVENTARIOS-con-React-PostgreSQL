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

export const TablaMarca = ({ data }) => {
  const { eliminarMarca, editarMarca } = useMarcaStore();

  const editar = () => {};

  const eliminar = (p) => {
    console.log(p);

    if (p.descripcion === "Genérico") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Este registro no se permite eliminar!",
      });
      return;
    }

    Swal.fire({
      title: "¿Estas seguro(a)?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡eliminalo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarMarca({ id: p.id });

        Swal.fire({
          title: "Eliminado!",
          text: "Su archivo ha sido eliminado",
          icon: "success",
        });
      }
    });
  };

  const columns = [
    {
      accessorKey: "descripcion",
      header: "Descripcion",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      accesorkey: "acciones",
      header: " ",
      cell: (info) => (
        <td className="content-cell">
          <ContentAccionesTabla
            funcionEditar={() => editar(info.row.original)}
            funcionEliminar={() => eliminar(info.row.original)}
          />
        </td>
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
          {table.getHeaderGroups().map((headeerGroup) => (
            <tr key={headeerGroup.id}>
              {headeerGroup.headers.map((header) => (
                <th key={header.id}>{header.column.columnDef.header}</th>
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
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  margin: 5% 3%;
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
        border-bottom: 2px solid rgba(206, 206, 206, 0.32);
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