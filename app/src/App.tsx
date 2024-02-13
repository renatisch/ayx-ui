import NavBar from "./components/NavBar";
import Grid from "@mui/material/Grid";
import FlowChart from "./components/FlowChart";
import Sidebar from "./components/SideBar";
import ToolBar from "./components/ToolBar/ToolBar";
import { useState, createContext } from "react";
import { DcmDialog } from "./components/dcm/dcm";
import VQB from "./components/vqb/vqb";
import QueryBuilderDialog from "./components/queryBuilder/BuilderDialog";

interface DialogContextPrompts {
  dialogType: string;
  setDialogType: React.Dispatch<React.SetStateAction<string>>;
  isDialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedView: string;
  setSelectedView: React.Dispatch<React.SetStateAction<string>>;
  connection: string;
  setConnection: React.Dispatch<React.SetStateAction<string>>;
  vqbOpen: boolean;
  setVqbOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogContext = createContext<DialogContextPrompts>({
  dialogType: "",
  setDialogType: () => {},
  isDialogOpen: false,
  setDialogOpen: () => {},
  selectedView: "",
  setSelectedView: () => {},
  connection: "",
  setConnection: () => {},
  vqbOpen: false,
  setVqbOpen: () => {},
});

function App() {
  const [selectedTool, setSelectedTool] = useState("");
  const [dialogType, setDialogType] = useState("dataConnectorsDialog");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("dataSources");
  const [connection, setConnection] = useState("");
  const [vqbOpen, setVqbOpen] = useState(false);

  return (
    <div className="App">
      <DialogContext.Provider
        value={{
          dialogType: dialogType,
          setDialogType: setDialogType,
          isDialogOpen: isDialogOpen,
          setDialogOpen: setDialogOpen,
          selectedView: selectedView,
          setSelectedView: setSelectedView,
          connection: connection,
          setConnection: setConnection,
          vqbOpen: vqbOpen,
          setVqbOpen: setVqbOpen,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <NavBar />
          </Grid>
          <Grid item xs={12}>
            <ToolBar tool={selectedTool} setSelectedTol={setSelectedTool} />
          </Grid>
          <Grid item xs={3.5}>
            <Sidebar />
          </Grid>
          <Grid item xs={8.5}>
            <FlowChart inputToolName={selectedTool} />
          </Grid>
        </Grid>
        <DcmDialog />
        <QueryBuilderDialog
          dialogOpen={vqbOpen}
          setDialogOpen={setVqbOpen}
          dialogView={dialogType}
          setDialogView={setDialogType}
        />
      </DialogContext.Provider>
    </div>
  );
}

export default App;
