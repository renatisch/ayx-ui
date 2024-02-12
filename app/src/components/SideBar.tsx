import { Box, Divider, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormatSpecificOptionsTable from "./Table";
import { useState, useContext } from "react";
import { DcmDialog } from "./dcm/dcm";
import { DialogContext } from "../App";

export default function SideBar() {
  const [dcm, setDcm] = useState(false);
  const { isDialogOpen, setDialogOpen } = useContext(DialogContext);

  const handleDcmDialogOpen = () => {
    if (dcm) {
      setDialogOpen(!isDialogOpen);
    }
  };

  return (
    <>
      <Paper sx={{ height: "910px", background: "#f6f8fc", borderRight: 1 }}>
        <Grid container>
          <Grid item xs={12} borderBottom={0.1} borderTop={0.1}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              marginX={1}
              marginY={2}
            >
              <Typography color={"#5f6e8a"}>
                <b>Input data</b> - Configuration
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"center"}
                sx={{ verticalAlign: "center" }}
              >
                <MoreVertIcon sx={{ color: "#5f6e8a" }} />
                <PushPinOutlinedIcon sx={{ color: "#5f6e8a" }} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} borderRight={0.5} height={"850px"}>
            <Box marginY={2} marginLeft={1}>
              <Box>
                <SettingsOutlinedIcon sx={{ color: "#5f6e8a" }} />
              </Box>
              <Box>
                <OutboundOutlinedIcon sx={{ color: "#5f6e8a" }} />
              </Box>
              <Box>
                <LocalOfferOutlinedIcon sx={{ color: "#5f6e8a" }} />
              </Box>
              <Box>
                <HelpOutlineOutlinedIcon sx={{ color: "#5f6e8a" }} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={11}>
            <Box margin={1}>
              <Typography>Connect a file or database</Typography>
              <TextField
                variant="standard"
                fullWidth
                sx={{
                  backgroundColor: !dcm ? "white" : "#e0e0e0",
                  marginTop: 1,
                  border: 1,
                }}
              />
              <Box display={"flex"} justifyContent={"center"} marginY={1}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleDcmDialogOpen}
                  sx={{
                    background: "#e0e0e0",
                    color: "black",
                    textTransform: "none",
                    fontSize: "15px",
                    ":hover": {
                      background: "lightblue",
                    },
                  }}
                >
                  Set Up a Connection
                </Button>
              </Box>
              <Box display={"flex"} alignItems={"center"} margin={0}>
                <Checkbox
                  onChange={() => {
                    setDcm(!dcm);
                  }}
                  sx={{ paddingLeft: 0 }}
                />
                <Typography>Use Data Connection Manager (DCM)</Typography>
              </Box>
              <Box margin={0}>
                <Typography>Options</Typography>
                <Box>
                  <FormatSpecificOptionsTable />
                </Box>
              </Box>
            </Box>
            <Divider sx={{ border: 1 }} />
            <Typography>Preview (first 100 records)</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
