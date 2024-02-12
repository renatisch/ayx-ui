import {
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyIcon from "../../../../../assets/icons/dcm/key.svg";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import { DialogContext } from "../../../../../App";
import { useContext } from "react";

interface ConnectionDetailsViewProps {
  connection: string;
}

export default function ConnectionDetailsView({
  connection,
}: ConnectionDetailsViewProps) {
  const { setDialogType, setSelectedView, setDialogOpen, setVqbOpen } =
    useContext(DialogContext);

  const handleReturn = () => {
    setSelectedView("dataSources");
  };

  const handleConnect = () => {
    setDialogType("vqb");
    setDialogOpen(false);
    setTimeout(() => {
      setVqbOpen(true);
    }, 2000);
  };

  const fields = [
    { fieldName: "Technology", value: "Snowflake ODBC DSN-less with Simba" },
    {
      fieldName: "Server",
      value: "gx16938.europe-west4.gcp.snowflakecomputing.com",
    },
    {
      fieldName: "Driver",
      value: "Simba Snowflake ODBC Driver",
    },
    {
      fieldName: "Database",
      value: "Dynamo_DB",
    },
    {
      fieldName: "Schema",
      value: "Dynamo",
    },
    {
      fieldName: "Warehouse",
      value: "COMPUTE_WH",
    },
    {
      fieldName: "Role",
      value: "Analyst",
    },
  ];

  return (
    <Grid item xs={10} paddingRight={2}>
      <Box
        marginTop={1}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={37.49}
      >
        <Box display={"flex"} alignItems={"center"}>
          <IconButton
            sx={{
              borderRadius: 0,
              marginRight: 2,
              color: "#0078d0",
              backgroundColor: "#e6f1f4",
            }}
            onClick={() => {
              handleReturn();
            }}
          >
            <ArrowBackOutlinedIcon />
          </IconButton>
          <Typography fontWeight={600}>{connection}</Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <IconButton sx={{ marginRight: 2 }}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "#0078d0",
              backgroundColor: "#e6f1f4",
              border: 0,
            }}
            startIcon={<EditOutlinedIcon />}
          >
            Edit
          </Button>
        </Box>
      </Box>
      <Grid container marginTop={1} spacing={2}>
        <Grid item xs={12}>
          <Box marginTop={1}>
            <Typography fontWeight={550} color={"#b0b4b7"} fontSize={15}>
              Data Source Name *
            </Typography>
            <Box marginLeft={2} marginTop={1}>
              <Typography>{connection}</Typography>
            </Box>
          </Box>
          {fields.map((field, index) => {
            return (
              <Box marginTop={1} key={index}>
                <Typography fontWeight={550} color={"#b0b4b7"} fontSize={15}>
                  {field.fieldName}
                </Typography>
                <Box marginLeft={2} marginTop={1}>
                  <Typography>{field.value}</Typography>
                </Box>
              </Box>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <Box
            marginTop={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={600}>Connections</Typography>
            <IconButton sx={{ borderRadius: 0 }}>
              <AddOutlinedIcon sx={{ color: "#0078d0" }} />
              <Typography marginLeft={1} fontSize={14} color={"#0078d0"}>
                Create Credential
              </Typography>
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Grid container padding={2}>
              <Grid
                item
                xs={0.5}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                marginRight={1.5}
              >
                <img
                  src={KeyIcon}
                  alt="KeyIcons"
                  height={20}
                  style={{ strokeWidth: 100 }}
                />
              </Grid>
              <Grid item xs={9}>
                <Box>
                  <Typography>Generic OAuth</Typography>
                  <Box display={"flex"} alignItems={"center"}>
                    <IconButton sx={{ borderRadius: 0, padding: 0 }}>
                      <Typography color={"#0078d0"}>
                        Ping Federate Authentication
                      </Typography>
                    </IconButton>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{
                        marginX: 1,
                        backgroundColor: "black",
                        width: 1.1,
                        height: 15,
                      }}
                    />
                    <Typography>Generic OAuth application</Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <IconButton sx={{ borderRadius: 0, padding: 0 }}>
                      <Typography color={"#0078d0"}>
                        Renat's Snowflake creds
                      </Typography>
                    </IconButton>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{
                        marginX: 1,
                        backgroundColor: "black",
                        width: 1.1,
                        height: 15,
                      }}
                    />
                    <Typography>Generic OAuth tokens</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"end"}
                  marginTop={2}
                >
                  <MoreVertSharpIcon />
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    onClick={handleConnect}
                  >
                    Connect
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
