import React from "react";
import { useTable } from "react-table";

const TickTable = ({ ticks }) => {
  const columns = React.useMemo(
    () => [
      { Header: "Timestamp", accessor: "ts" },
      { Header: "Symbol", accessor: "ticker" },
      { Header: "Price", accessor: "ltp" },
      { Header: "Volume", accessor: "ltq" },
    ],
    []
  );

  const data = React.useMemo(() => ticks, [ticks]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className="tick-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TickTable;