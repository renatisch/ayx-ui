import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
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
import { useState, useEffect, useCallback } from "react";
import InputNode from "./Nodes/InputNode";
import { createContext } from "react";

export type FlowChartContextProps = {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  inputClicked: boolean;
  setInputClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

interface FlowChartProps {
  inputToolName: string;
}

export const FlowChartContext = createContext<FlowChartContextProps>({
  nodes: [],
  setNodes: () => {},
  inputClicked: false,
  setInputClicked: () => {},
});
const nodeTypes: NodeTypes = {
  inputNode: InputNode,
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

function FlowChart({ inputToolName }: FlowChartProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [inputClicked, setInputClicked] = useState(false);

  let initialNode = {
    id: "0",
    data: {
      nodeName: inputToolName,
    },
    position: {
      x: 0,
      y: 0,
    },
    type: "inputNode",
  };

  useEffect(() => {
    if (inputToolName) {
      setNodes([initialNode]);
    }
  }, [inputToolName]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

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
    },
    [nodes, edges]
  );

  return (
    <div style={{ height: "100%" }}>
      <FlowChartContext.Provider
        value={{
          nodes,
          setNodes,
          inputClicked: inputClicked,
          setInputClicked: setInputClicked,
        }}
      >
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
        />
      </FlowChartContext.Provider>
    </div>
  );
}

export default FlowChart;
