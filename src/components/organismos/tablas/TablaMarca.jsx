import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";
import { FaArrowsAltV } from "react-icons/fa";

export const TablaMarca = ({ data }) => {
  const columns = [
    {
      accessorKey: "descripcion",
      header: "Descripcion",
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
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <span
                      style={{ cursor: "pointer" }}
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
    </Container>
  );
};
const Container = styled.div``;
