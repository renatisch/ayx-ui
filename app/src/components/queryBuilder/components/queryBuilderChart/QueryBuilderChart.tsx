import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  OnNodesChange,
  OnEdgesChange,
  Node,
  Edge,
  addEdge,
  getIncomers,
  getConnectedEdges,
  getOutgoers,
  NodeTypes,
  FitViewOptions,
  DefaultEdgeOptions,
} from "reactflow";
import "reactflow/dist/style.css";
import { useState, useEffect, useCallback, useContext } from "react";
import { DialogContext } from "../../BuilderDialog";
import { Table } from "../schemaLister/types";
import DbNode from "./components/DbNode";
import CustomEdge from "./components/CustomEdge";

const nodeTypes: NodeTypes = {
  dbNode: DbNode,
};
const edgeTypes = {
  "custom-edge": CustomEdge,
};

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const styles = {
  background: "white",
  height: "100%",
};

function QueryBuilderChart() {
  const {
    tables,
    setTables,
    nodes,
    setNodes,
    edges,
    setEdges,
    setAction,
    query,
    setQuery,
  } = useContext(DialogContext);

  const getNode = (table: Table, index: number) => {
    return {
      id: index.toString(),
      data: {
        handleType: index === 0 ? "source" : "target",
        database: table.database,
        schema: table.schema,
        tableName: table.tableName,
        columns: table.columns,
        expanded: table.expanded,
      },
      position: {
        x: 0,
        y: 0,
      },
      type: "dbNode",
    };
  };

  useEffect(() => {
    tables.map((table: Table, index) => {
      if (table.tableName === "") {
        setTables([]);
      } else {
        if (nodes.length > 0) {
          nodes.map((node) => {
            if (table.tableName !== node.data["tableName"]) {
              setNodes((nodes) => [...nodes, getNode(table, index)]);
            } else {
              setNodes(nodes);
            }
          });
        } else {
          setNodes((nodes) => [...nodes, getNode(table, index)]);
        }
      }
    });
  }, [tables]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: any) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const deleteTable = (tableName: string) => {
    let remainingTables = tables.filter((table) => {
      if (table.tableName !== tableName) {
        return table;
      }
    });
    setTables(remainingTables);
  };

  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
      deleteTable(deleted[0].data["tableName"]);
      setAction("");
      if (deleted[0].data["handleType"] === "source") {
        setQuery({
          ...query,
          primarySchema: "",
          primaryColumn: "",
          primaryDatabase: "",
          primaryTable: "",
          action: "",
        });
      } else {
        setQuery({
          ...query,
          secondaryDatabase: "",
          secondarySchema: "",
          secondaryTable: "",
          secondaryColumn: "",
          action: "",
        });
      }
    },
    [nodes, edges]
  );

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        style={styles}
        nodes={nodes}
        edges={edges}
        onNodesDelete={onNodesDelete}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      />
    </div>
  );
}

export default QueryBuilderChart;
