import Dialog from "@mui/material/Dialog";
import { Paper, Typography, Box, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import dataSourcesIcon from "../../../../assets/icons/dcm/database.svg";
import linkIcon from "../../../../assets/icons/dcm/link.svg";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DataSourcesView from "./views/dataSourcesView";
import ConnectionDetailsView from "./views/ConnectionDetailsView";
import { useContext } from "react";
import { DialogContext } from "../../../../App";

interface ConnectionDialogProps {
  open: boolean;
  handleClose: Function;
  setDialogType: Function;
}

export default function ConnectionDialog({
  open,
  handleClose,
}: ConnectionDialogProps) {
  const { setSelectedView, selectedView, connection } =
    useContext(DialogContext);
  const handleViewSelect = (value: string) => {
    setSelectedView(value);
  };

  return (
    <Dialog
      hideBackdrop
      open={open}
      fullWidth
      maxWidth={"lg"}
      PaperProps={{ sx: { height: 900 } }}
    >
      <Paper sx={{ background: "#f8fafe", height: "100%" }}>
        <Box
          display={"flex"}
          sx={{ background: "#0b71c6" }}
          padding={1}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography color={"white"} fontSize={14}>
            Connection Manager
          </Typography>
          <IconButton onClick={() => handleClose()}>
            <CloseIcon sx={{ color: "white", height: 20 }} />
          </IconButton>
        </Box>
        <Grid container paddingTop={2} spacing={2}>
          <Grid item xs={2}>
            <Box display={"flex"} flexDirection={"column"} paddingLeft={2}>
              <IconButton
                sx={{
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  justifyContent: "left",
                  background: selectedView === "dataSources" ? "#d6e8f5" : "",
                }}
                onClick={() => {
                  handleViewSelect("dataSources");
                }}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <img
                    src={dataSourcesIcon}
                    alt="dataSourcesIcon"
                    style={{ height: 20 }}
                  />
                  <Typography
                    color={selectedView === "dataSources" ? "#0078d0" : ""}
                    marginLeft={2}
                    fontWeight={selectedView === "dataSources" ? 700 : ""}
                  >
                    Data Sources
                  </Typography>
                </Box>
              </IconButton>
              <IconButton
                sx={{
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  justifyContent: "left",
                  background: selectedView === "credentials" ? "#d6e8f5" : "",
                }}
                onClick={() => {
                  handleViewSelect("credentials");
                }}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <LockOutlinedIcon />
                  <Typography
                    color={selectedView === "credentials" ? "#0078d0" : ""}
                    marginLeft={2}
                    fontWeight={selectedView === "credentials" ? 700 : ""}
                  >
                    Credentials
                  </Typography>
                </Box>
              </IconButton>
              <Divider sx={{ marginY: 2 }} />
              <IconButton
                sx={{
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  //   borderRadius: 0,
                  justifyContent: "left",
                  background: selectedView === "alteryxLinks" ? "#d6e8f5" : "",
                }}
                onClick={() => {
                  handleViewSelect("alteryxLinks");
                }}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <img
                    src={linkIcon}
                    alt="alteryxLinks"
                    style={{ height: 20 }}
                  />
                  <Typography
                    color={selectedView === "alteryxLinks" ? "#0078d0" : ""}
                    marginLeft={2}
                    fontWeight={selectedView === "alteryxLinks" ? 700 : ""}
                  >
                    Alteryx Links
                  </Typography>
                </Box>
              </IconButton>
            </Box>
          </Grid>
          {selectedView === "dataSources" ? (
            <DataSourcesView />
          ) : selectedView === "connectionDetails" ? (
            <ConnectionDetailsView connection={connection} />
          ) : (
            ""
          )}
        </Grid>
      </Paper>
    </Dialog>
  );
}
