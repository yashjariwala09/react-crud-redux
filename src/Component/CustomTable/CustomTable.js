import React, { useEffect } from "react";
import clsx from "clsx";
import {
  Table,
  Paper,
  TableContainer,
  TableBody,
  TablePagination,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { lighten, makeStyles } from "@material-ui/core/styles";
import CreateTableRow from "./CustomTableRow";
import EnhancedTableHead from "./CustomTableHeader";
import { AddCircleOutline, EditRounded, Delete } from "@material-ui/icons";
import Spinner from "../Loader/Loader";
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: "bold",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el["originalValue"], index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => array[el[1]]);
}

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { selectedTasks, openModal, isUpdating } = props;

  let singleSelectedTask = null;
  const numSelected = Object.keys(selectedTasks).filter((key) => {
    if (!singleSelectedTask && selectedTasks[key].checked) {
      singleSelectedTask = selectedTasks[key].originalValue;
    }
    return selectedTasks[key].checked;
  }).length;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Tasks
        </Typography>
      )}

      {isUpdating ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Spinner width={25} height={25} />
          <Typography component="div">Updating</Typography>
        </div>
      ) : null}
      {numSelected > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <Delete onClick={() => openModal("remove", selectedTasks)} />
            </IconButton>
          </Tooltip>
          {numSelected === 1 ? (
            <Tooltip title="Edit">
              <IconButton aria-label="Edit">
                <EditRounded
                  onClick={() => openModal("edit", singleSelectedTask)}
                />
              </IconButton>
            </Tooltip>
          ) : (
            <></>
          )}
          <Tooltip title="Add new task">
            <IconButton aria-label="Add new task">
              <AddCircleOutline onClick={() => openModal("add")} />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Add new task">
          <IconButton aria-label="Add new task">
            <AddCircleOutline onClick={() => openModal("add")} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

function CustomTable({ tableData = {}, onUpdateTask, openModal, isUpdating }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("taskName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [rowsHeader, setRowsHeader] = React.useState([]);
  const [selectedTasks, changeSelectedTask] = React.useState({});

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function sortData(tableValue, tableColumn) {
    const colunmIndex = tableColumn.findIndex((value) => value === orderBy);
    const sortedData = stableSort(
      tableValue,
      getComparator(order, orderBy),
      colunmIndex
    );
    const pageData = sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    setRows(pageData);
  }

  useEffect(() => {
    const { tableValue = [], tableColumn = [] } = tableData;
    sortData(tableValue, tableColumn);
    setRowsHeader(tableColumn);
    changeSelectedTask({});
  }, [tableData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const { tableValue = [], tableColumn = [] } = tableData;
    sortData(tableValue, tableColumn);
  }, [order, page, rowsPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlecheckBoxChange = (event, id) => {
    const { tableColumn = [] } = tableData;
    const modifiedRowIndex = rows.findIndex((value) => value.id === id);
    const cellIndex = tableColumn.findIndex(
      (value) => value === event.target.name
    );
    if (modifiedRowIndex === -1 || cellIndex === -1) return;
    const selectedRow = rows[modifiedRowIndex];
    const updatedRow = {
      ...selectedRow,
      cells: [
        ...selectedRow.cells.slice(0, cellIndex),
        {
          ...selectedRow.cells[cellIndex],
          cellValue: event.target.checked,
        },
        ...selectedRow.cells.slice(cellIndex + 1, selectedRow.cells.length),
      ],
      originalValue: {
        ...selectedRow.originalValue,
        [tableColumn[cellIndex]]: event.target.checked,
      },
    };
    const updatedTableValue = [
      ...rows.slice(0, modifiedRowIndex),
      updatedRow,
      ...rows.slice(modifiedRowIndex + 1, rows.length),
    ];
    sortData(updatedTableValue, tableColumn);
    onUpdateTask(id, updatedRow.originalValue);
  };

  const selectTask = (e, id) => {
    const { tableValue = [] } = tableData;
    const slectedRowIndex = tableValue.findIndex((value) => value.id === id);
    if (slectedRowIndex === -1) return;
    changeSelectedTask({
      ...selectedTasks,
      [id]: {
        checked: e.target.checked,
        originalValue: tableValue[slectedRowIndex].originalValue,
      },
    });
  };

  const rowOption = {
    rows: rows,
    handlecheckBoxChange: handlecheckBoxChange,
    selectTask: selectTask,
    selectedTasks: selectedTasks,
  };

  const tableRows = CreateTableRow(rowOption);
  const { tableValue = [] } = tableData;
  const totalRow = tableValue.length;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          selectedTasks={selectedTasks}
          openModal={openModal}
          isUpdating={isUpdating}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              rowsHeader={rowsHeader}
            />
            <TableBody>{tableRows}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRow}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default CustomTable;
