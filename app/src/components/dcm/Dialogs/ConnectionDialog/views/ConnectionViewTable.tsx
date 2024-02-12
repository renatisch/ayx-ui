import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Link, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useContext } from "react";
import { DialogContext } from "../../../../../App";

export default function ConnectionViewTable() {
  const columnWidth = 200;
  const { setSelectedView, setConnection } = useContext(DialogContext);

  const handleClick = (connection: string) => {
    setConnection(connection);
    setSelectedView("connectionDetails");
  };
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: columnWidth,
      renderCell: (params: GridRenderCellParams<any, string>) => {
        return (
          <IconButton
            sx={{ borderRadius: 0 }}
            onClick={() => {
              handleClick(params.row.name);
            }}
          >
            <Link sx={{ textDecoration: "none", fontSize: 15 }}>
              {params.row.name}
            </Link>
          </IconButton>
        );
      },
    },
    {
      field: "technology",
      headerName: "Technology",
      width: columnWidth,
      type: "string",
    },
    {
      field: "connections",
      headerName: "Connections",
      width: columnWidth,
      type: "string",
    },
    {
      field: "lastUpdated",
      headerName: "Last updated",
      width: 300,
      type: "string",
    },
    {
      field: "delete",
      headerName: "",
      width: 50,
      renderCell: (params: GridRenderCellParams<any, string>) => {
        return (
          <IconButton sx={{ borderRadius: 0 }}>
            <DeleteOutlineIcon />
          </IconButton>
        );
      },
    },
  ];
  const rows: GridRowsProp = [
    {
      id: 1,
      name: "My first connection",
      technology: "Snowflake ODBC DSN-less with Simba",
      connections: "3",
      lastUpdated: "Sep 05, 2023 5:35 PM",
      delete: "",
    },
    {
      id: 2,
      name: "My second connection",
      technology: "Snowflake ODBC DSN-less with Simba",
      connections: "1",
      lastUpdated: "Oct 05, 2023 5:35 PM",
      delete: "",
    },
    {
      id: 3,
      name: "DB1",
      technology: "Snowflake ODBC DSN-less with Simba",
      connections: "1",
      lastUpdated: "Oct 30, 2023 10:35 PM",
      delete: "",
    },
    {
      id: 5,
      name: "Renat's Snowflake",
      technology: "Snowflake ODBC DSN-less with Simba",
      connections: "11",
      lastUpdated: "Jul 25, 2023 8:50 PM",
      delete: "",
    },
    {
      id: 6,
      name: "Test Snowflake connection",
      technology: "Snowflake ODBC DSN-less with Simba",
      connections: "5",
      lastUpdated: "Aug 14, 2023 2:16 PM",
      delete: "",
    },
    {
      id: 7,
      name: "Snowflake connection",
      technology: "Snowflake ODBC DSN-less with Simba",
      connections: "7",
      lastUpdated: "Oct 14, 2023 2:16 PM",
      delete: "",
    },
    {
      id: 8,
      name: "Connection 4",
      technology: "Snowflake ODBC DSN-less with Simba",
      connections: "4",
      lastUpdated: "Dec 4, 2023 2:16 PM",
      delete: "",
    },
    {
      id: 9,
      name: "DB2 connections",
      technology: "Snowflake ODBC DSN-less with Simba",
      connections: "1",
      lastUpdated: "Oct 30, 2023 10:35 PM",
      delete: "",
    },
    {
      id: 10,
      name: "Renat's Snowflake 2",
      technology: "Snowflake ODBC DSN-less with Simba",
      connections: "11",
      lastUpdated: "Jul 25, 2023 8:50 PM",
      delete: "",
    },
  ];

  return (
    <DataGrid
      sx={{ background: "white" }}
      disableRowSelectionOnClick
      rows={rows}
      columns={columns}
    />
  );
}
