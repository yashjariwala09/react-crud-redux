import React from "react";
import { TableRow, TableCell, Checkbox } from "@material-ui/core";

function CreateTableCell({
  id,
  cellType,
  cellValue,
  displayName,
  handlecheckBoxChange,
}) {
  switch (cellType) {
    case "boolean":
      return (
        <TableCell padding="checkbox">
          <Checkbox
            checked={cellValue}
            name={displayName}
            onChange={(e) => handlecheckBoxChange(e, id)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </TableCell>
      );
    default:
      return <TableCell align="left">{cellValue}</TableCell>;
  }
}

function CreateTableRow({
  rows,
  handlecheckBoxChange,
  selectedTasks,
  selectTask,
}) {
  let cellOption = {
    handlecheckBoxChange,
  };
  return rows.map(({ cells, id }) => {
    const tableCells = cells.map((cellvalue) => {
      cellOption = { ...cellOption, ...cellvalue, id };
      return CreateTableCell(cellOption);
    });
    return (
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={!!(selectedTasks[id] && selectedTasks[id].checked)}
            onChange={(e) => selectTask(e, id)}
          />
        </TableCell>
        {tableCells}
      </TableRow>
    );
  });
}

export default CreateTableRow;
