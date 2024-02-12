import DataConnectorsDialog from "./Dialogs/DataConnectorsDialog/DataConnectorsDialog";
import ConnectionDialog from "./Dialogs/ConnectionDialog/ConnectionDialog";
import { useContext } from "react";
import { DialogContext } from "../../App";

export interface DcmDialogProps {
  open: boolean;
  setDialogOpen: Function;
}

const DcmDialog = () => {
  const { dialogType, setDialogType, isDialogOpen, setDialogOpen } =
    useContext(DialogContext);

  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleDialogSelect = (dialogType: string) => {
    setDialogType(dialogType);
  };

  return dialogType === "dataConnectorsDialog" ? (
    <DataConnectorsDialog
      open={isDialogOpen}
      handleClose={handleClose}
      setDialogType={handleDialogSelect}
    />
  ) : (
    <ConnectionDialog
      open={isDialogOpen}
      handleClose={handleClose}
      setDialogType={handleDialogSelect}
    />
  );
};

export { DcmDialog };
