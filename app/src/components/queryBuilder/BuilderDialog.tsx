import React from "react";
import {
  Dialog,
  Paper,
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Checkbox,
} from "@mui/material";
import MinimizeIcon from "@mui/icons-material/Minimize";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import CloseIcon from "@mui/icons-material/Close";
import { useState, createContext } from "react";
import QueryBuilderChart from "./components/queryBuilderChart/QueryBuilderChart";
import SchemaLister from "./components/schemaLister/SchemaLister";
import {
  QueryDialogContextProps,
  Table,
  Query,
} from "./components/schemaLister/types";
import SqlEditorView from "../vqb/SqlEditorView";
import { Node, Edge } from "reactflow";
import axios from "axios";
import { format } from "sql-formatter";

export const DialogContext = createContext<QueryDialogContextProps>({
  nodes: [],
  setNodes: () => {},
  edges: [],
  setEdges: () => {},
  action: "",
  setAction: () => {},
  tables: [{ database: "", schema: "", tableName: "", columns: [] }],
  setTables: () => {},
  query: {
    primaryDatabase: "",
    primarySchema: "",
    primaryTable: "",
    primaryColumn: "",
    secondaryDatabase: "",
    secondarySchema: "",
    secondaryTable: "",
    secondaryColumn: "",
    action: "",
  },
  setQuery: () => {},
  queryLoading: false,
  setQueryLoading: () => {},
  editorQuery: "",
  setEditorQuery: () => {},
});

interface BuilderProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogView: string;
  setDialogView: React.Dispatch<React.SetStateAction<string>>;
}

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 20000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export default function QueryBuilderDialog({
  dialogOpen,
  setDialogOpen,
  dialogView,
  setDialogView,
}: BuilderProps) {
  const [tables, setTables] = useState<Table[]>([
    {
      database: "",
      schema: "",
      tableName: "",
      columns: [],
    },
  ]);

  const [query, setQuery] = useState<Query>({
    primaryDatabase: "",
    primarySchema: "",
    primaryTable: "",
    primaryColumn: "",
    secondaryDatabase: "",
    secondarySchema: "",
    secondaryTable: "",
    secondaryColumn: "",
    action: "",
  });
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [action, setAction] = useState("");
  const [editorQuery, setEditorQuery] = useState("");
  const [queryLoading, setQueryLoading] = useState(true);

  const getQuery = (tables: Table[]) => {
    if (tables.length > 0) {
      if (tables.length === 1) {
        let selectedTables = tables.map((table) => {
          return {
            database: table.database,
            databaseSchema: table.schema,
            table: table.tableName,
            columns: table.columns
              ?.filter((item) => {
                if (item.selected) {
                  return item;
                }
              })
              .map((each) => {
                return each.name;
              }),
            actionColumns: table.columns
              ?.filter((item) => {
                if (item.selected) {
                  return item;
                }
              })
              .map((each) => {
                return each.name;
              }),
          };
        });
        return {
          action: "select",
          databases: selectedTables,
        };
      } else if (tables.length === 2 && action === "join") {
        let selectedTables = tables.map((table) => {
          return {
            database: table.database,
            databaseSchema: table.schema,
            table: table.tableName,
            columns: table.columns?.map((column) => {
              return column.name;
            }),
            actionColumns: table.columns
              ?.filter((item) => {
                if (item.selected) {
                  return item;
                }
              })
              .map((each) => {
                return each.name;
              }),
          };
        });
        return {
          action: "join",
          databases: selectedTables,
        };
      } else if (tables.length === 2 && action === "union") {
        let selectedTables = tables.map((table) => {
          return {
            database: table.database,
            databaseSchema: table.schema,
            table: table.tableName,
            columns: table.columns?.map((column) => {
              return column.name;
            }),
            actionColumns: table.columns
              ?.filter((item) => {
                if (item.selected) {
                  return item;
                }
              })
              .map((each) => {
                return each.name;
              }),
          };
        });
        return {
          action: "union",
          databases: selectedTables,
        };
      }
    }
  };

  const handleClick = async () => {
    let query = getQuery(tables);
    console.log(query);
    if (nodes.length > 0) {
      const res = await instance
        .post("/generate", query)
        .then((response) => {
          let createdQuery = response.data.response[0].query;
          return createdQuery;
        })
        .catch((error) => {
          console.log(error);
        });
      const formattedQuery = format(res, {
        language: "snowflake",
        keywordCase: "upper",
      });
      setEditorQuery(formattedQuery);
      setQueryLoading(false);
    }
  };

  return (
    <DialogContext.Provider
      value={{
        nodes: nodes,
        setNodes: setNodes,
        edges: edges,
        setEdges: setEdges,
        action,
        setAction,
        tables: tables,
        setTables: setTables,
        query: query,
        setQuery: setQuery,
        queryLoading: queryLoading,
        setQueryLoading: setQueryLoading,
        editorQuery: editorQuery,
        setEditorQuery: setEditorQuery,
      }}
    >
      <Dialog
        hideBackdrop
        open={dialogOpen}
        fullWidth
        maxWidth={"md"}
        PaperProps={{ sx: { height: 860, width: 1400 } }}
      >
        <Paper sx={{ background: "#f1f1f1", height: "100%" }}>
          <Box
            display={"flex"}
            sx={{ background: "#0b71c6" }}
            paddingX={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography color={"white"} fontSize={14}>
              AI Powered VQB
            </Typography>
            <Box alignItems={"center"}>
              <IconButton>
                <MinimizeIcon
                  sx={{ color: "white", paddingRight: 1, height: 20 }}
                />
              </IconButton>
              <IconButton>
                <WebAssetIcon
                  sx={{ color: "white", paddingRight: 1, height: 20 }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                <CloseIcon
                  sx={{ color: "white", paddingRight: 1, height: 20 }}
                />
              </IconButton>
            </Box>
          </Box>
          <Grid container padding={2}>
            <Grid item xs={12} marginY={1}>
              <Box display={"flex"}>
                <input className="winCl-btn" type="button" value="Tables" />
                <input
                  className={
                    dialogView === "vqb" ? "winCl-btn-active" : "winCl-btn"
                  }
                  type="button"
                  value="Visual Query Builder"
                  onClick={() => {
                    setDialogView("vqb");
                    setQueryLoading(true);
                    setEditorQuery("");
                  }}
                />
                <input
                  className="winCl-btn"
                  type="button"
                  value="Stored Procedures"
                />
                <input
                  className={
                    dialogView === "sql_editor"
                      ? "winCl-btn-active"
                      : "winCl-btn"
                  }
                  type="button"
                  value="SQL Editor"
                  onClick={() => {
                    handleClick();
                    setDialogView("sql_editor");
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              {dialogView === "vqb" ? (
                <>
                  <Grid container>
                    <Grid item xs={8.5} padding={2} height={650}>
                      <Box height={"100%"} width={"100%"} className="vqb">
                        <QueryBuilderChart />
                      </Box>
                    </Grid>
                    <Grid item xs={3.5} paddingY={2} paddingX={1} height={650}>
                      <Box
                        height={"100%"}
                        width={"100%"}
                        className="vqb"
                        bgcolor={"white"}
                      >
                        <SchemaLister />
                      </Box>
                    </Grid>
                  </Grid>
                </>
              ) : dialogView === "sql_editor" ? (
                <SqlEditorView />
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={12}>
              {dialogView === "vqb" && (
                <Grid item xs={12}>
                  <Box display={"flex"} alignItems={"center"}>
                    <Checkbox />
                    <Typography>
                      Open Visual Query Builder by default
                    </Typography>
                  </Box>
                </Grid>
              )}

              <Grid item xs={12}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"end"}
                  paddingRight={2}
                >
                  <Button
                    variant="contained"
                    sx={{ width: 100, height: 30, marginRight: 2 }}
                  >
                    Ok
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      width: 100,
                      height: 30,
                      marginRight: 2,
                      textTransform: "none",
                    }}
                    onClick={() => {
                      setDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
    </DialogContext.Provider>
  );
}
