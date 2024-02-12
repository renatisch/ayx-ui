import Dialog from "@mui/material/Dialog";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import dataSourcesIcon from "../../../../assets/icons/dcm/database.svg";
import ScheduleIcon from "@mui/icons-material/Schedule";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import LanguageIcon from "@mui/icons-material/Language";
import RecentView from "./RecentView";
import DataSourceView from "./DataSourceView/DataSourcesView";
import { useState } from "react";

interface DataConnectorsDialogProps {
  open: boolean;
  handleClose: Function;
  setDialogType: Function;
}
export default function DataConnectorsDialog({
  open,
  handleClose,
  setDialogType,
}: DataConnectorsDialogProps) {
  const [selectedView, setSelectedView] = useState("recent");
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
            Data Connectors
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
                  borderRadius: 0,
                  justifyContent: "left",
                  background: selectedView === "recent" ? "#d5d7db" : "",
                }}
                onClick={() => {
                  handleViewSelect("recent");
                }}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <ScheduleIcon sx={{ height: 25 }} />
                  <Typography color={"black"} marginLeft={2}>
                    Recent
                  </Typography>
                </Box>
              </IconButton>
              <IconButton
                sx={{
                  borderRadius: 0,
                  justifyContent: "left",
                  background: selectedView === "saved" ? "#d5d7db" : "",
                }}
                onClick={() => {
                  handleViewSelect("saved");
                }}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <StarBorderIcon sx={{ height: 25 }} />
                  <Typography color={"black"} marginLeft={2}>
                    Saved
                  </Typography>
                </Box>
              </IconButton>
              <IconButton
                sx={{
                  borderRadius: 0,
                  justifyContent: "left",
                  background: selectedView === "files" ? "#d5d7db" : "",
                }}
                onClick={() => {
                  handleViewSelect("files");
                }}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <FolderOpenIcon sx={{ height: 25 }} />
                  <Typography color={"black"} marginLeft={2}>
                    Files
                  </Typography>
                </Box>
              </IconButton>
              <IconButton
                sx={{
                  borderRadius: 0,
                  justifyContent: "left",
                  background: selectedView === "dataSources" ? "#d5d7db" : "",
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
                  <Typography color={"black"} marginLeft={2}>
                    Data sources
                  </Typography>
                </Box>
              </IconButton>
              <IconButton
                sx={{
                  borderRadius: 0,
                  width: 150,
                  justifyContent: "left",
                  background: selectedView === "server" ? "#d5d7db" : "",
                }}
                onClick={() => {
                  handleViewSelect("server");
                }}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <LanguageIcon sx={{ height: 25 }} />
                  <Typography color={"black"} marginLeft={2}>
                    Server
                  </Typography>
                </Box>
              </IconButton>
            </Box>
          </Grid>
          {selectedView === "recent" ? (
            <RecentView />
          ) : selectedView === "dataSources" ? (
            <DataSourceView setDialogType={setDialogType} />
          ) : (
            ""
          )}
        </Grid>
      </Paper>
    </Dialog>
  );
}
