import {
  Dialog,
  Paper,
  Box,
  Typography,
  Grid,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import MinimizeIcon from "@mui/icons-material/Minimize";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import CloseIcon from "@mui/icons-material/Close";
import VQB_builder_view from "./vqb_builder_view";
import SqlEditorView from "./SqlEditorView";
import { useState } from "react";
import { useContext } from "react";
import { DialogContext } from "../../App";

export default function VQB() {
  const [dialogView, setDialogView] = useState("vqb");
  // const { vqbOpen, setVqbOpen } = useContext(DialogContext);
  const [vqbOpen, setVqbOpen] = useState(true);

  return (
    <Dialog
      hideBackdrop
      open={vqbOpen}
      fullWidth
      maxWidth={"md"}
      PaperProps={{ sx: { height: 860, width: 800 } }}
    >
      <Paper sx={{ background: "#f1f1f1", height: "100%" }}>
        <Box
          display={"flex"}
          sx={{ background: "#0b71c6" }}
          padding={1.5}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography color={"white"} fontSize={14}>
            Choose Table or Specify Query
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
                setVqbOpen(false);
                setDialogView("vqb");
              }}
            >
              <CloseIcon sx={{ color: "white", paddingRight: 1, height: 20 }} />
            </IconButton>
          </Box>
        </Box>
        <Grid container paddingTop={2} spacing={2}>
          <Grid item xs={12}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              paddingLeft={2}
              justifyItems={"center"}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Box display={"flex"}>
                    <input className="winCl-btn" type="button" value="Tables" />
                    <input
                      className={
                        dialogView === "vqb" ? "winCl-btn-active" : "winCl-btn"
                      }
                      type="button"
                      value="Visual Query Builder"
                      onClick={() => setDialogView("vqb")}
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
                      onClick={() => setDialogView("sql_editor")}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  {dialogView === "vqb" ? (
                    <VQB_builder_view />
                  ) : dialogView === "sql_editor" ? (
                    <SqlEditorView />
                  ) : (
                    <></>
                  )}
                </Grid>
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
                        setVqbOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        width: 100,
                        height: 30,
                        marginRight: 2,
                        textTransform: "none",
                      }}
                    >
                      Help
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
}
